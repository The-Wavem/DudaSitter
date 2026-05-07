import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar as CalendarIcon, CalendarPlus, Check, ExternalLink, Plus, Search, X } from 'lucide-react';
import { format, endOfDay, parseISO, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { getAppointments, saveAppointment, updateAppointmentStatus } from '@/services/agendaAPI';
import styles from './AdminAgenda.module.css';

registerLocale('pt-BR', ptBR);

const MotionDiv = motion.div;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AdminAgenda() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppTutor, setNewAppTutor] = useState('');
  const [newAppPet, setNewAppPet] = useState('');
  const [newAppService, setNewAppService] = useState('Pet Sitter (Hospedagem em casa)');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [newAppNotes, setNewAppNotes] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadAppointments = async () => {
      try {
        const nextAppointments = await getAppointments();

        if (isActive) {
          setAppointments(nextAppointments);
        }
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
        toast.error('Ocorreu um erro. Tente novamente.');
      }
    };

    loadAppointments();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const appointmentDate = parseISO(appointment.date);
    const matchesText = [appointment.tutorName, appointment.petName].some((field) => field.toLowerCase().includes(normalizedSearchTerm));
    const matchesStartDate = !filterStartDate || appointmentDate >= startOfDay(filterStartDate);
    const matchesEndDate = !filterEndDate || appointmentDate <= endOfDay(filterEndDate);

    return matchesText && matchesStartDate && matchesEndDate;
  });

  const visibleAppointments = filteredAppointments.slice(0, visibleCount);

  const handleSaveAppointment = async (event) => {
    event.preventDefault();

    if (!newAppTutor || !newAppPet || !selectedDate || !startTime || !endTime) {
      return;
    }

    const appointmentDate = format(selectedDate, 'yyyy-MM-dd');
    const appointmentStartTime = format(startTime, 'HH:mm');
    const appointmentEndTime = format(endTime, 'HH:mm');

    try {
      await saveAppointment({
        tutorName: newAppTutor,
        petName: newAppPet,
        service: newAppService,
        date: appointmentDate,
        startTime: appointmentStartTime,
        endTime: appointmentEndTime,
        notes: newAppNotes,
      });

      setAppointments(await getAppointments());
      setNewAppTutor('');
      setNewAppPet('');
      setSelectedDate(new Date());
      setStartTime(new Date());
      setEndTime(new Date());
      setNewAppNotes('');
      setIsModalOpen(false);
      toast.success('Agendamento salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setVisibleCount(3);
  };

  const handleStartDateChange = (date) => {
    setFilterStartDate(date ? startOfDay(date) : null);
    setVisibleCount(3);
  };

  const handleEndDateChange = (date) => {
    setFilterEndDate(date ? endOfDay(date) : null);
    setVisibleCount(3);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterStartDate(null);
    setFilterEndDate(null);
    setVisibleCount(3);
  };

  const getFriendlyDate = (dateStr, timeStr) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return `${format(date, "dd 'de' MMM", { locale: ptBR })}, ${timeStr}`;
    } catch {
      return `${dateStr} ${timeStr}`;
    }
  };

  const getGoogleCalendarUrl = (appointment) => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent(`${appointment.service.includes('Sitter') ? 'Pet Sitter' : 'Dog Walker'} - ${appointment.petName} (${appointment.tutorName})`);
    const details = encodeURIComponent(`Serviço: ${appointment.service}\nNotas: ${appointment.notes}`);
    const startString = `${appointment.date.replace(/-/g, '')}T${appointment.startTime.replace(/:/g, '')}00`;
    const endString = `${appointment.date.replace(/-/g, '')}T${appointment.endTime.replace(/:/g, '')}00`;

    return `${baseUrl}&text=${text}&details=${details}&dates=${startString}/${endString}`;
  };

  const summaryToday = appointments.filter((appointment) => appointment.date === format(new Date(), 'yyyy-MM-dd')).length;

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Agenda</h2>
          <p className={styles.subtitle}>Gerencie seus horários de passeios e visitas.</p>
        </div>

        <button type="button" className={styles.fabButton} onClick={() => setIsModalOpen(true)}>
          <Plus className={styles.fabIcon} aria-hidden="true" />
          <span>Novo Agendamento</span>
        </button>
      </header>

      <div className={styles.filterRow}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
            placeholder="Buscar por tutor ou pet"
            aria-label="Buscar agendamentos"
          />
        </div>

        <div className={styles.dateFilters}>
          <DatePicker
            selected={filterStartDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            placeholderText="Data Inicial"
            className={styles.searchInput}
          />
          <DatePicker
            selected={filterEndDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            placeholderText="Data Final"
            className={styles.searchInput}
          />
          <button type="button" className={styles.clearFiltersButton} onClick={handleClearFilters}>
            Limpar Filtros
          </button>
        </div>
      </div>

      <MotionDiv className={styles.summaryCard} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} whileHover={{ y: -2 }}>
        <div className={styles.summaryIconWrap}>
          <CalendarIcon className={styles.summaryIcon} aria-hidden="true" />
        </div>
        <div>
          <h3 className={styles.summaryTitle}>Resumo do Dia (Hoje)</h3>
          <p className={styles.summaryText}>{summaryToday} compromissos agendados</p>
        </div>
      </MotionDiv>

      <div className={styles.grid}>
        <MotionDiv className={styles.timeline} variants={containerVariants} initial="hidden" animate="show">
          {appointments.length === 0 ? (
            <MotionDiv className={styles.emptyState} variants={itemVariants}>
              <CalendarIcon className={styles.emptyIcon} aria-hidden="true" />
              <p className={styles.emptyText}>Nenhum compromisso marcado.</p>
            </MotionDiv>
          ) : filteredAppointments.length === 0 ? (
            <MotionDiv className={styles.emptyState} variants={itemVariants}>
              <Search className={styles.emptyIcon} aria-hidden="true" />
              <p className={styles.emptyText}>Nenhum agendamento encontrado para essa busca.</p>
            </MotionDiv>
          ) : (
            visibleAppointments.map((appointment) => (
              <MotionDiv
                key={appointment.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className={`${styles.timelineCard} ${appointment.status === 'scheduled' ? styles.timelineCardActive : styles.timelineCardMuted}`}
              >
                <div className={styles.timelineTop}>
                  <div>
                    <span className={styles.badge}>{getFriendlyDate(appointment.date, appointment.startTime)} - {appointment.endTime}</span>
                    <h4 className={styles.timelineTitle}>{appointment.petName} <span>({appointment.tutorName})</span></h4>
                    <p className={styles.timelineService}>{appointment.service}</p>
                  </div>

                  {appointment.status === 'scheduled' && (
                    <a href={getGoogleCalendarUrl(appointment)} target="_blank" rel="noopener noreferrer" className={styles.calendarLink}>
                      <ExternalLink className={styles.linkIcon} aria-hidden="true" /> Google Agenda
                    </a>
                  )}
                </div>

                {appointment.notes && <div className={styles.notes}>{appointment.notes}</div>}

                <div className={styles.actions}>
                  {appointment.status === 'scheduled' ? (
                    <>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await updateAppointmentStatus(appointment.id, 'completed');
                            setAppointments(await getAppointments());
                            toast.success('Agendamento concluído com sucesso!');
                          } catch (error) {
                            console.error('Erro ao concluir agendamento:', error);
                            toast.error('Ocorreu um erro. Tente novamente.');
                          }
                        }}
                        className={styles.completeButton}
                      >
                        <Check className={styles.actionIcon} aria-hidden="true" /> Concluir
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await updateAppointmentStatus(appointment.id, 'cancelled');
                            setAppointments(await getAppointments());
                            toast.success('Agendamento cancelado com sucesso!');
                          } catch (error) {
                            console.error('Erro ao cancelar agendamento:', error);
                            toast.error('Ocorreu um erro. Tente novamente.');
                          }
                        }}
                        className={styles.cancelButton}
                      >
                        <X className={styles.actionIcon} aria-hidden="true" /> Cancelar
                      </button>
                    </>
                  ) : (
                    <span className={`${styles.statusText} ${appointment.status === 'completed' ? styles.statusCompleted : styles.statusCancelled}`}>
                      {appointment.status === 'completed' ? 'Concluído' : 'Cancelado'}
                    </span>
                  )}
                </div>
              </MotionDiv>
            ))
          )}

          {visibleCount < filteredAppointments.length && (
            <div className={styles.loadMoreWrap}>
              <button type="button" className={styles.loadMoreButton} onClick={() => setVisibleCount((current) => current + 3)}>
                Carregar mais agendamentos
              </button>
            </div>
          )}
        </MotionDiv>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <MotionDiv
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <MotionDiv
              className={styles.modalContent}
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h3 className={styles.modalTitle}>Novo Agendamento</h3>
                  <p className={styles.modalSubtitle}>Crie um novo compromisso sem sair da agenda.</p>
                </div>

                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.modalCloseButton} aria-label="Fechar modal">
                  <X className={styles.modalCloseIcon} aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSaveAppointment} className={styles.form}>
                <div className={styles.doubleField}>
                  <div className={styles.field}>
                    <label className={styles.label}>Tutor</label>
                    <input type="text" required value={newAppTutor} onChange={(event) => setNewAppTutor(event.target.value)} className={styles.input} placeholder="Nome" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Pet</label>
                    <input type="text" required value={newAppPet} onChange={(event) => setNewAppPet(event.target.value)} className={styles.input} placeholder="Pet e Raça" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Serviço</label>
                  <select required value={newAppService} onChange={(event) => setNewAppService(event.target.value)} className={styles.select}>
                    <option value="Pet Sitter (Hospedagem em casa)">Pet Sitter (Hospedagem em casa)</option>
                    <option value="Dog Walker (Passeios)">Dog Walker (Passeios)</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Data</label>
                  <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date || new Date())} dateFormat="dd/MM/yyyy" locale="pt-BR" className={styles.customDatePicker} />
                </div>

                <div className={styles.doubleField}>
                  <div className={styles.field}>
                    <label className={styles.label}>Início</label>
                    <DatePicker selected={startTime} onChange={(time) => setStartTime(time || new Date())} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Hora" dateFormat="HH:mm" locale="pt-BR" className={styles.customDatePicker} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Término</label>
                    <DatePicker selected={endTime} onChange={(time) => setEndTime(time || new Date())} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Hora" dateFormat="HH:mm" locale="pt-BR" className={styles.customDatePicker} />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Notas / Endereço</label>
                  <textarea rows={2} value={newAppNotes} onChange={(event) => setNewAppNotes(event.target.value)} className={styles.textarea} placeholder="Instruções extra..." />
                </div>

                <button type="submit" className={styles.saveButton}>Salvar Agendamento</button>
              </form>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </section>
  );
}
