import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Info, Link as LinkIcon, Plus, Quote, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  addGalleryImage,
  addTestimonial,
  deleteGalleryImage,
  deleteTestimonial,
  getAboutData,
  getContactData,
  getGallery,
  getTestimonials,
  updateAboutData,
  updateContactData,
} from '@/services/cmsAPI';
import styles from './AdminCMS.module.css';

const MotionDiv = motion.div;

const tabMotion = {
  rest: { y: 0, scale: 1 },
  hover: { y: -1, scale: 1.01 },
  tap: { scale: 0.99 },
};

const sectionMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AdminCMS() {
  const [activeCmsTab, setActiveCmsTab] = useState('gallery');
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [aboutData, setAboutData] = useState({ bio: '', mission: '', age: '', semester: '' });
  const [contactData, setContactData] = useState({ whatsapp: '', instagram: '', introText: '' });

  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImgService, setNewImgService] = useState('Sitter');

  const [newTestTutor, setNewTestTutor] = useState('');
  const [newTestPet, setNewTestPet] = useState('');
  const [newTestMessage, setNewTestMessage] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadCmsData = async () => {
      try {
        const [nextGallery, nextTestimonials, nextAboutData, nextContactData] = await Promise.all([
          getGallery(),
          getTestimonials(),
          getAboutData(),
          getContactData(),
        ]);

        if (!isActive) {
          return;
        }

        setGallery(nextGallery);
        setTestimonials(nextTestimonials);
        setAboutData(nextAboutData);
        setContactData(nextContactData);
      } catch (error) {
        console.error('Erro ao carregar CMS:', error);
        toast.error('Ocorreu um erro. Tente novamente.');
      }
    };

    loadCmsData();

    return () => {
      isActive = false;
    };
  }, []);

  const handleAddImage = async (event) => {
    event.preventDefault();
    if (!newImgUrl) return;

    try {
      await addGalleryImage(newImgUrl, newImgService);
      setGallery(await getGallery());
      setNewImgUrl('');
      toast.success('Foto salva com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar imagem:', error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  const handleAddTestimonial = async (event) => {
    event.preventDefault();
    if (!newTestTutor || !newTestPet || !newTestMessage) return;

    try {
      await addTestimonial({ name: newTestTutor, pet: newTestPet, text: newTestMessage });
      setTestimonials(await getTestimonials());
      setNewTestTutor('');
      setNewTestPet('');
      setNewTestMessage('');
      toast.success('Depoimento salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar depoimento:', error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  const handleSaveAbout = async (event) => {
    event.preventDefault();
    try {
      await updateAboutData(aboutData);
      toast.success('Conteúdo sobre salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados sobre:', error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  const handleSaveContact = async (event) => {
    event.preventDefault();
    try {
      await updateContactData(contactData);
      toast.success('Contato salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Editor do Site</h2>
          <p className={styles.subtitle}>Gerencie todos os conteúdos visíveis para os visitantes.</p>
        </div>
      </header>

      <div className={styles.tabs}>
        <motion.button type="button" onClick={() => setActiveCmsTab('gallery')} className={`${styles.tabButton} ${activeCmsTab === 'gallery' ? styles.tabButtonActive : ''}`} variants={tabMotion} initial="rest" whileHover="hover" whileTap="tap">
          <ImageIcon className={styles.tabIcon} aria-hidden="true" /> Galerias
        </motion.button>
        <motion.button type="button" onClick={() => setActiveCmsTab('testimonials')} className={`${styles.tabButton} ${activeCmsTab === 'testimonials' ? styles.tabButtonActive : ''}`} variants={tabMotion} initial="rest" whileHover="hover" whileTap="tap">
          <Quote className={styles.tabIcon} aria-hidden="true" /> Depoimentos
        </motion.button>
        <motion.button type="button" onClick={() => setActiveCmsTab('about')} className={`${styles.tabButton} ${activeCmsTab === 'about' ? styles.tabButtonActive : ''}`} variants={tabMotion} initial="rest" whileHover="hover" whileTap="tap">
          <Info className={styles.tabIcon} aria-hidden="true" /> Sobre Mim
        </motion.button>
        <motion.button type="button" onClick={() => setActiveCmsTab('contact')} className={`${styles.tabButton} ${activeCmsTab === 'contact' ? styles.tabButtonActive : ''}`} variants={tabMotion} initial="rest" whileHover="hover" whileTap="tap">
          <LinkIcon className={styles.tabIcon} aria-hidden="true" /> Contato
        </motion.button>
      </div>

      {activeCmsTab === 'gallery' && (
        <MotionDiv className={styles.gridTwoColumns} variants={sectionMotion} initial="hidden" animate="visible">
          <MotionDiv className={styles.panel} whileHover={{ y: -2 }}>
            <h3 className={styles.panelTitle}><Upload className={styles.panelIcon} aria-hidden="true" /> Adicionar Foto</h3>
            <form onSubmit={handleAddImage} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>URL da Imagem</label>
                <input type="url" required value={newImgUrl} onChange={(event) => setNewImgUrl(event.target.value)} className={styles.input} placeholder="https://exemplo.com/foto.jpg" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Serviço</label>
                <select value={newImgService} onChange={(event) => setNewImgService(event.target.value)} className={styles.select}>
                  <option value="Sitter">Pet Sitter</option>
                  <option value="Walker">Dog Walker</option>
                </select>
              </div>
              <button type="submit" className={styles.saveButton}><Plus className={styles.saveIcon} aria-hidden="true" /> Adicionar</button>
            </form>
          </MotionDiv>

          <MotionDiv className={styles.panel} whileHover={{ y: -2 }}>
            <h3 className={styles.panelTitle}><ImageIcon className={styles.panelIcon} aria-hidden="true" /> Fotos Atuais</h3>
            {gallery.length === 0 ? (
              <div className={styles.emptyState}>
                <ImageIcon className={styles.emptyIcon} aria-hidden="true" />
                <p className={styles.emptyText}>Nenhuma foto adicionada.</p>
              </div>
            ) : (
              <div className={styles.imageGrid}>
                {gallery.map((image) => (
                  <div key={image.id} className={styles.imageCard}>
                    <img src={image.url} alt="Galeria" className={styles.image} />
                    <div className={`${styles.serviceTag} ${image.service === 'Sitter' ? styles.serviceTagSitter : styles.serviceTagWalker}`}>{image.service}</div>
                    <button type="button" onClick={async () => {
                      try {
                        await deleteGalleryImage(image.id);
                        setGallery(await getGallery());
                        toast.success('Foto excluída com sucesso!');
                      } catch (error) {
                        console.error('Erro ao excluir imagem:', error);
                        toast.error('Ocorreu um erro. Tente novamente.');
                      }
                    }} className={styles.deleteOverlayButton}>
                      <Trash2 className={styles.deleteIcon} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </MotionDiv>
        </MotionDiv>
      )}

      {activeCmsTab === 'testimonials' && (
        <MotionDiv className={styles.gridTwoColumns} variants={sectionMotion} initial="hidden" animate="visible">
          <MotionDiv className={styles.panel} whileHover={{ y: -2 }}>
            <h3 className={styles.panelTitle}><Plus className={styles.panelIcon} aria-hidden="true" /> Novo Depoimento</h3>
            <form onSubmit={handleAddTestimonial} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Nome do Tutor</label>
                <input type="text" required value={newTestTutor} onChange={(event) => setNewTestTutor(event.target.value)} className={styles.input} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Nome do Pet (e Raça)</label>
                <input type="text" required value={newTestPet} onChange={(event) => setNewTestPet(event.target.value)} className={styles.input} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Mensagem</label>
                <textarea required value={newTestMessage} onChange={(event) => setNewTestMessage(event.target.value)} rows={3} className={styles.textarea} />
              </div>
              <button type="submit" className={styles.saveButton}>Adicionar</button>
            </form>
          </MotionDiv>

          <MotionDiv className={styles.panel} whileHover={{ y: -2 }}>
            <h3 className={styles.panelTitle}><Quote className={styles.panelIcon} aria-hidden="true" /> Depoimentos Atuais</h3>
            {testimonials.length === 0 ? (
              <div className={styles.emptyState}>
                <Quote className={styles.emptyIcon} aria-hidden="true" />
                <p className={styles.emptyText}>Nenhum depoimento adicionado.</p>
              </div>
            ) : (
              <div className={styles.testimonialList}>
                {testimonials.map((testimonial) => (
                  <article key={testimonial.id} className={styles.testimonialCard}>
                    <Quote className={styles.testimonialQuote} aria-hidden="true" />
                    <div className={styles.testimonialContent}>
                      <p className={styles.testimonialText}>"{testimonial.text}"</p>
                      <p className={styles.testimonialAuthor}>{testimonial.name} <span>({testimonial.pet})</span></p>
                    </div>
                    <button type="button" onClick={async () => {
                      try {
                        await deleteTestimonial(testimonial.id);
                        setTestimonials(await getTestimonials());
                        toast.success('Depoimento excluído com sucesso!');
                      } catch (error) {
                        console.error('Erro ao excluir depoimento:', error);
                        toast.error('Ocorreu um erro. Tente novamente.');
                      }
                    }} className={styles.deleteMiniButton}>
                      <Trash2 className={styles.deleteIcon} aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </MotionDiv>
        </MotionDiv>
      )}

      {activeCmsTab === 'about' && (
        <MotionDiv className={styles.panelLarge} variants={sectionMotion} initial="hidden" animate="visible" whileHover={{ y: -2 }}>
          <h3 className={styles.panelTitle}><Info className={styles.panelIcon} aria-hidden="true" /> Detalhes da Página "Sobre Mim"</h3>
          <form onSubmit={handleSaveAbout} className={styles.formLarge}>
            <div className={styles.doubleField}>
              <div className={styles.field}>
                <label className={styles.label}>Idade</label>
                <input type="text" required value={aboutData.age} onChange={(event) => setAboutData({ ...aboutData, age: event.target.value })} className={styles.input} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Período da Faculdade</label>
                <input type="text" required value={aboutData.semester} onChange={(event) => setAboutData({ ...aboutData, semester: event.target.value })} className={styles.input} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Biografia (Texto Principal)</label>
              <textarea required value={aboutData.bio} onChange={(event) => setAboutData({ ...aboutData, bio: event.target.value })} rows={6} className={styles.textarea} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Sua Missão</label>
              <textarea required value={aboutData.mission} onChange={(event) => setAboutData({ ...aboutData, mission: event.target.value })} rows={3} className={styles.textarea} />
            </div>
            <button type="submit" className={styles.saveButtonWide}>Salvar Alterações</button>
          </form>
        </MotionDiv>
      )}

      {activeCmsTab === 'contact' && (
        <MotionDiv className={styles.panelLarge} variants={sectionMotion} initial="hidden" animate="visible" whileHover={{ y: -2 }}>
          <h3 className={styles.panelTitle}><LinkIcon className={styles.panelIcon} aria-hidden="true" /> Informações de Contato</h3>
          <form onSubmit={handleSaveContact} className={styles.formLarge}>
            <div className={styles.doubleField}>
              <div className={styles.field}>
                <label className={styles.label}>WhatsApp (só números)</label>
                <input type="text" required value={contactData.whatsapp} onChange={(event) => setContactData({ ...contactData, whatsapp: event.target.value })} className={styles.input} placeholder="Ex: 21972229509" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Instagram (sem o @)</label>
                <input type="text" required value={contactData.instagram} onChange={(event) => setContactData({ ...contactData, instagram: event.target.value })} className={styles.input} placeholder="Ex: dudasitter" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Texto de Introdução</label>
              <textarea required value={contactData.introText} onChange={(event) => setContactData({ ...contactData, introText: event.target.value })} rows={3} className={styles.textarea} />
            </div>
            <button type="submit" className={styles.saveButtonWide}>Salvar Contatos</button>
          </form>
        </MotionDiv>
      )}
    </section>
  );
}
