import { useState } from 'react';
import { CalendarPlus, Check, Circle, MessageSquare, Search, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { deleteMessage, markAsRead } from '@/services/messagesAPI';
import styles from './AdminMessages.module.css';

const MotionDiv = motion.div;

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AdminMessages({ messages = [], isLoading = false, onOpenAgenda = () => {}, onRefreshMessages = async () => {} }) {
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredMessages = messages.filter((message) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();

    return [message.name, message.petName, message.message].some((field) => field.toLowerCase().includes(normalizedSearchTerm));
  });

  const visibleMessages = filteredMessages.slice(0, visibleCount);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>Mensagens Recebidas</h2>
            <p className={styles.subtitle}>Gerencie seus contatos e orçamentos.</p>
          </div>
        </header>

        <MotionDiv className={styles.emptyState} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <MessageSquare className={styles.emptyIcon} aria-hidden="true" />
          <p className={styles.emptyText}>Carregando mensagens...</p>
        </MotionDiv>
      </section>
    );
  }

  const handleMarkAsRead = async (id) => {
    try {
      setIsActionLoading(true);
      await markAsRead(id);
      await onRefreshMessages();
      setIsActionLoading(false);
      toast.success('Mensagem marcada como lida!');
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
      setIsActionLoading(false);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      setIsActionLoading(true);
      await deleteMessage(id);
      await onRefreshMessages();
      setIsActionLoading(false);
      toast.success('Mensagem excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error);
      setIsActionLoading(false);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setVisibleCount(3);
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Mensagens Recebidas</h2>
          <p className={styles.subtitle}>Gerencie seus contatos e orçamentos.</p>
        </div>
      </header>

      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} aria-hidden="true" />
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
          placeholder="Buscar por nome, pet ou mensagem"
          aria-label="Buscar mensagens"
        />
      </div>

      {messages.length === 0 ? (
        <MotionDiv className={styles.emptyState} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <MessageSquare className={styles.emptyIcon} aria-hidden="true" />
          <p className={styles.emptyText}>Nenhuma mensagem no momento.</p>
        </MotionDiv>
      ) : filteredMessages.length === 0 ? (
        <MotionDiv className={styles.emptyState} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Search className={styles.emptyIcon} aria-hidden="true" />
          <p className={styles.emptyText}>Nenhuma mensagem encontrada para essa busca.</p>
        </MotionDiv>
      ) : (
        <MotionDiv className={styles.list} variants={listVariants} initial="hidden" animate="show">
          {visibleMessages.map((message) => {
            const isNew = message.status === 'new';

            return (
              <MotionDiv key={message.id} variants={itemVariants} whileHover={{ y: -2 }} className={`${styles.card} ${isNew ? styles.cardNew : ''}`}>
                {isNew && (
                  <span className={styles.newBadge} aria-hidden="true">
                    <span className={styles.newPing} />
                    <span className={styles.newDot} />
                  </span>
                )}

                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.cardTitle}>{message.name}</h3>
                    <p className={styles.cardMeta}>
                      <span>Pet:</span> {message.petName} &nbsp;|&nbsp; <span>Serviço:</span> {message.service}
                    </p>
                  </div>

                  <span className={styles.dateBadge}>{new Date(message.date).toLocaleString('pt-BR')}</span>
                </div>

                <div className={styles.messageBox}>{message.message}</div>

                <div className={styles.actions}>
                  <button type="button" onClick={() => onOpenAgenda(message)} className={styles.scheduleButton} disabled={isActionLoading}>
                    <CalendarPlus className={styles.actionIcon} aria-hidden="true" /> Agendar Serviço
                  </button>

                  <button type="button" onClick={() => handleDeleteMessage(message.id)} className={styles.deleteButton} disabled={isActionLoading}>
                    <Trash2 className={styles.actionIcon} aria-hidden="true" /> Excluir
                  </button>

                  {isNew ? (
                    <button type="button" onClick={() => handleMarkAsRead(message.id)} className={styles.readButton} disabled={isActionLoading}>
                      <Circle className={styles.actionIcon} aria-hidden="true" /> Marcar como lido
                    </button>
                  ) : (
                    <button type="button" className={styles.readOnlyButton} disabled>
                      <Check className={styles.actionIcon} aria-hidden="true" /> Lido
                    </button>
                  )}
                </div>
              </MotionDiv>
            );
          })}

          {visibleCount < filteredMessages.length && (
            <div className={styles.loadMoreWrap}>
              <button type="button" className={styles.loadMoreButton} onClick={() => setVisibleCount((current) => current + 3)}>
                Carregar mais mensagens
              </button>
            </div>
          )}
        </MotionDiv>
      )}
    </section>
  );
}
