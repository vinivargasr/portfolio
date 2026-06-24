import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pipe para sanitizar URLs de iframe
@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

export interface Project {
  id: number;
  name: string;
  url: string;
  description: string;
  tag: string;
  year: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})

export class Projects implements AfterViewInit {
  getUrlDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
    }
  }

  hoveredId: number | null = null;
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      id: 1,
      name: 'ExKomm',
      url: 'https://www.exkomm.com/',
      description: 'Plataforma de comércio internacional conectando empresas ao mercado europeu com rastreabilidade.',
      tag: 'Web Site',
      year: '2025',
      technologies: ['Angular', 'PHP', 'MySQL', 'TypeScript'],
    },
    {
      id: 2,
      name: 'Lumenent',
      url: 'https://lumenent.com.br/',
      description: 'Experiência digital criada para uma produtora de música eletrônica, conectando público, artistas e eventos através de um design moderno e envolvente.',
      tag: 'Web Site',
      year: '2026',
      technologies: ['React', 'PHP', 'MySQL', 'TypeScript'],
    },
  ];

  onHover(id: number) {
    this.hoveredId = id;
  }

  onLeave() {
    this.hoveredId = null;
  }

  onSelect(project: Project) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = null;
  }

  ngAfterViewInit(): void {
    // Entrada dos cards com stagger
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Entrada do header
    gsap.from('.projects-header', {
      scrollTrigger: {
        trigger: '.projects-header',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }
}