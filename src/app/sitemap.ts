import type { MetadataRoute } from 'next';
import { SERVICES, TEAM_MEMBERS } from '@/lib/data';
import { getAllProjects } from '@/lib/data-store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://proxytech.dev';

  const coreRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/projects', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/team', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.95, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Dynamic service detail routes
  const serviceRoutes = SERVICES.map((service) => ({
    url: `/services/${service.slug}`,
    priority: 0.85,
    changeFrequency: 'weekly' as const,
  }));

  // Dynamic project/case study routes
  const projects = await getAllProjects();
  const projectRoutes = projects.map((project) => ({
    url: `/projects/${project.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  // Dynamic team member routes
  const teamRoutes = TEAM_MEMBERS.map((member) => ({
    url: `/team/${member.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  const allRoutes = [...coreRoutes, ...serviceRoutes, ...projectRoutes, ...teamRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
