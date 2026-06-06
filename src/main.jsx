import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BadgeCheck, CalendarClock, CheckCircle2, Copy, Download, FileArchive, FileDown, HelpCircle, Mail, MessageCircle, MousePointerClick, Puzzle, ShieldCheck, Sparkles, Star, Wrench } from 'lucide-react';
import './style.css';

const EXTENSION_ZIP = '/downloads/crawler-nfse-pro-extensao.zip';

const plans = [
  { name: '1º Mensal', price: 12, months: 1, description: 'Plano mensal com downloads ilimitados e atualizações.' },
  { name: '2º Mensal 2 Promocional', price: 16, months: 2, description: 'Plano mensal 2 para 2 meses de acesso com downloads ilimitados e atualizações.' },
  { name: '3º Mensal 3 Promocional', price: 22, months: 3, description: 'Plano mensal 3 para 3 meses de acesso com downloads ilimitados e atualizações.' },
  { name: '4º Plano anual', price: 70, months: 12, description: 'Plano anual com 12 meses de acesso ilimitado e atualizações.' },
  { name: '5º Plano anual - 3 anos Promocional', price: 150, months: 36, description: 'Plano anual com 36 meses de acesso ilimitado e atualizações.' }
];

function money(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function App() {
  const [copied, setCopied] = useState('');
  const bestPlan = useMemo(() => plans.reduce((best, plan) => Number(plan.months) > Number(best.months) ? plan : best, plans[0]), []);

  const copy = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1600);
  };

  return <main>
    <nav className="nav">
      <a className="brand" href="#top"><span>NFS-e</span><b>Baixar NFS-e Pro</b></a>
      <div className="links"><a href="#instalar">Instalar</a><a href="#planos">Planos</a><a href="#suporte">Suporte</a><a className="navBtn" href={EXTENSION_ZIP} download>Baixar extensão</a></div>
    </nav>

    <section id="top" className="hero">
      <div className="heroText">
        <div className="badge"><Sparkles size={16}/> Extensão premium para baixar NFS-e</div>
        <h1>Baixe notas fiscais NFS-e com praticidade, segurança e suporte todos os dias.</h1>
        <p>Instale a extensão manualmente no Chrome enquanto ela ainda não está disponível na Chrome Web Store. Depois é só entrar no portal, ativar sua licença e gerar seus downloads.</p>
        <div className="actions"><a className="primary" href={EXTENSION_ZIP} download><Download size={20}/> Baixar extensão agora</a><a className="secondary" href="#instalar"><MousePointerClick size={20}/> Ver passo a passo</a></div>
        <div className="trust"><span><ShieldCheck/> Licença validada por usuário</span><span><FileDown/> XML, PDF e CSV</span><span><CalendarClock/> Planos de 1 a 36 meses</span></div>
      </div>

      <div className="heroPanel">
        <div className="chromeBar"><i></i><i></i><i></i><span>Chrome Extensions</span></div>
        <div className="installPreview">
          <Puzzle className="chromeIcon"/>
          <h3>Instalação manual rápida</h3>
          <p>Baixe o arquivo, extraia a pasta e use o botão do Chrome:</p>
          <img src="/images/botao-carregar-expandida.png" alt="Botão Carregar expandida do Chrome" />
          <small>O nome pode aparecer como “Carregar expandida” no seu Chrome.</small>
        </div>
      </div>
    </section>

    <section className="benefits">
      <article><BadgeCheck/><h3>Simples para o cliente</h3><p>Interface guiada com portal, tipo de nota, período, formato e status da licença.</p></article>
      <article><ShieldCheck/><h3>Pagamento com login</h3><p>O pagamento só é iniciado quando existe usuário cadastrado e logado na extensão.</p></article>
      <article><Wrench/><h3>Suporte ampliado</h3><p>Atendimento para dúvidas, instalação e problemas de pagamento das 08:00 às 21:00.</p></article>
    </section>

    <section id="instalar" className="section install">
      <div className="sectionHead"><span>Tutorial de instalação</span><h2>Como instalar a extensão no Chrome</h2><p>Siga o passo a passo abaixo enquanto a extensão não está publicada na Chrome Web Store.</p></div>
      <div className="steps">
        <article><b>1</b><FileArchive/><h3>Baixe a extensão</h3><p>Clique no botão de download e salve o arquivo ZIP no seu computador.</p><a href={EXTENSION_ZIP} download>Baixar ZIP</a></article>
        <article><b>2</b><CheckCircle2/><h3>Extraia a pasta</h3><p>Clique com o botão direito no ZIP e escolha extrair. Guarde a pasta em um local fixo.</p><div className="mockFolder">ZIP → Pasta extraída</div></article>
        <article><b>3</b><Puzzle/><h3>Abra extensões</h3><p>Acesse a página de extensões do Chrome.</p><button onClick={() => copy('chrome://extensions', 'chrome')}>{copied === 'chrome' ? 'Copiado!' : 'Copiar chrome://extensions'} <Copy size={15}/></button></article>
        <article><b>4</b><MousePointerClick/><h3>Ative modo desenvolvedor</h3><p>No canto superior da tela, habilite o modo desenvolvedor.</p><div className="switch"><span></span><strong>Ativado</strong></div></article>
        <article className="wide"><b>5</b><Download/><h3>Clique em “Carregar expandida”</h3><p>No seu Chrome, esse botão aparece como no print abaixo. Clique nele e selecione a pasta extraída da extensão.</p><img src="/images/botao-carregar-expandida.png" alt="Carregar expandida" /></article>
        <article><b>6</b><Star/><h3>Fixe e use</h3><p>Fixe a extensão na barra, entre no Portal NFS-e, faça login e escolha o período para baixar as notas.</p><div className="mockPanel"> NFS-e Pro<br/><small>Licença ativa</small></div></article>
      </div>
    </section>

    <section id="planos" className="section plans">
      <div className="sectionHead"><span>Planos disponíveis</span><h2>Escolha seu período de acesso</h2><p>Todos os planos incluem downloads ilimitados e atualizações.</p></div>
      <div className="planGrid">{plans.map((p, i) => <article className={p.name === bestPlan.name ? 'plan featured' : 'plan'} key={p.name}>
        <div className="planTop"><h3>{p.name}</h3>{p.name === bestPlan.name && <em>Melhor duração</em>}</div>
        <strong>{money(p.price)}</strong><small>{p.months} {p.months === 1 ? 'mês' : 'meses'} de acesso</small><p>{p.description}</p>
        <a href={EXTENSION_ZIP} download>{i === 0 ? 'Começar agora' : 'Baixar extensão'}</a>
      </article>)}</div>
      <img className="plansShot" src="/images/planos-dashboard.png" alt="Planos cadastrados" />
    </section>

    <section id="suporte" className="section support">
      <div className="supportCard"><div><span><HelpCircle/> Suporte</span><h2>Dúvidas, instalação e problemas de pagamento</h2><p>Atendimento disponível das <b>08:00 às 21:00</b>, de domingo a domingo, para dúvidas, suporte técnico e resolução de problemas de pagamento.</p></div><div className="supportActions"><a href={EXTENSION_ZIP} download><Download size={18}/> Baixar extensão</a><a href="mailto:helio.desenvolv@gmail.com"><Mail size={18}/> E-mail de suporte</a><a href="https://wa.me/5581999499307"><MessageCircle size={18}/> WhatsApp suporte</a></div></div>
    </section>

    <footer><b>NFS-e Pro</b><span>Extensão para download de notas fiscais NFS-e.</span><a href={EXTENSION_ZIP} download>Download da extensão</a></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
