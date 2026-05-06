import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, CalendarPlus, Check, ExternalLink, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getAppointments, saveAppointment, updateAppointmentStatus } from '@/lib/utils';
import styles from './AdminAgenda.module.css';

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
  const [newAppTutor, setNewAppTutor] = useState('');
  const [newAppPet, setNewAppPet] = useState('');
  const [newAppService, setNewAppService] = useState('Pet Sitter (Hospedagem em casa)');
  const [newAppDate, setNewAppDate] = useState('');
  const [newAppStartTime, setNewAppStartTime] = useState('');
  const [newAppEndTime, setNewAppEndTime] = useState('');
  const [newAppNotes, setNewAppNotes] = useState('');

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const handleSaveAppointment = (event) => {
    event.preventDefault();

    if (!newAppTutor || !newAppPet || !newAppDate || !newAppStartTime || !newAppEndTime) return;

    saveAppointment({
      tutorName: newAppTutor,
      petName: newAppPet,
      service: newAppService,
      date: newAppDate,
      startTime: newAppStartTime,
      endTime: newAppEndTime,
      notes: newAppNotes,
    });

    setAppointments(getAppointments());
    setNewAppTutor('');
    setNewAppPet('');
    setNewAppDate('');
    setNewAppStartTime('');
    setNewAppEndTime('');
    setNewAppNotes('');
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
      </header>

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
        <MotionDiv className={styles.formCard} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -2 }}>
          <h3 className={styles.sectionTitle}>
            <CalendarPlus className={styles.sectionTitleIcon} aria-hidden="true" /> Novo Agendamento
          </h3>

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
              <input type="date" required value={newAppDate} onChange={(event) => setNewAppDate(event.target.value)} className={styles.input} />
            </div>

            <div className={styles.doubleField}>
              <div className={styles.field}>
                <label className={styles.label}>Início</label>
                <input type="time" required value={newAppStartTime} onChange={(event) => setNewAppStartTime(event.target.value)} className={styles.input} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Término</label>
                <input type="time" required value={newAppEndTime} onChange={(event) => setNewAppEndTime(event.target.value)} className={styles.input} />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Notas / Endereço</label>
              <textarea rows={2} value={newAppNotes} onChange={(event) => setNewAppNotes(event.target.value)} className={styles.textarea} placeholder="Instruções extra..." />
            </div>

            <button type="submit" className={styles.saveButton}>Salvar Agendamento</button>
          </form>
        </MotionDiv>

        <MotionDiv className={styles.timeline} variants={containerVariants} initial="hidden" animate="show">
          {appointments.length === 0 ? (
            <MotionDiv className={styles.emptyState} variants={itemVariants}>
              <CalendarIcon className={styles.emptyIcon} aria-hidden="true" />
              <p className={styles.emptyText}>Nenhum compromisso marcado.</p>
            </MotionDiv>
          ) : (
            appointments.map((appointment) => (
              <MotionDiv key={appointment.id} variants={itemVariants} whileHover={{ y: -2 }} className={`${styles.timelineCard} ${appointment.status === 'scheduled' ? styles.timelineCardActive : styles.timelineCardMuted}`}>
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
                      <button type="button" onClick={() => { updateAppointmentStatus(appointment.id, 'completed'); setAppointments(getAppointments()); }} className={styles.completeButton}>
                        <Check className={styles.actionIcon} aria-hidden="true" /> Concluir
                      </button>
                      <button type="button" onClick={() => { updateAppointmentStatus(appointment.id, 'cancelled'); setAppointments(getAppointments()); }} className={styles.cancelButton}>
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
        </MotionDiv>
      </div>
    </section>
  );
}