import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {

  formData = {
    name: '',
    email: '',
    message: '',
  };

  sending = false;
  submitted = false;

  sendEmail(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.sending = true;

    // Monta link mailto como fallback simples
    // Troque por uma integração real (EmailJS, Resend, etc.) se quiser envio automático
    const subject = encodeURIComponent(`Contato via portfolio — ${this.formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${this.formData.name}\nEmail: ${this.formData.email}\n\n${this.formData.message}`
    );
    const mailtoLink = `mailto:seuemail@email.com?subject=${subject}&body=${body}`;

    // Simula pequeno delay e abre cliente de email
    setTimeout(() => {
      window.location.href = mailtoLink;
      this.sending = false;
      this.submitted = true;
      this.formData = { name: '', email: '', message: '' };

      // Esconde mensagem de sucesso após 4s
      setTimeout(() => {
        this.submitted = false;
      }, 4000);
    }, 600);
  }

  ngAfterViewInit(): void {
    // Header
    gsap.from('.contact-header', {
      scrollTrigger: {
        trigger: '.contact-header',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Info coluna
    gsap.from('.contact-info', {
      scrollTrigger: {
        trigger: '.contact-body',
        start: 'top 80%',
      },
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    });

    // Formulário
    gsap.from('.contact-form-wrap', {
      scrollTrigger: {
        trigger: '.contact-body',
        start: 'top 80%',
      },
      x: 40,
      opacity: 0,
      duration: 0.9,
      delay: 0.15,
      ease: 'power3.out',
    });

    // Links entram em stagger
    gsap.from('.contact-link-item', {
      scrollTrigger: {
        trigger: '.contact-links',
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
    });
  }
}