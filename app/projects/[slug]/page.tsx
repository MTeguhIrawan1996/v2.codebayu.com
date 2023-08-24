import BackButton from '@/app/common/components/elements/BackButton';
import Container from '@/app/common/components/elements/Container';
import PageHeading from '@/app/common/components/elements/PageHeading';
import { prisma } from '@/app/common/libs/prisma';
import { IProjectItem } from '@/app/common/types/projects';
import ProjectDetail from '@/app/modules/projects/components/ProjectDetail';
import React from 'react';

interface ProjectsDetailPageProps {
  params: { slug: string };
}

export default async function ProjectDetailPage({
  params,
}: ProjectsDetailPageProps) {
  const detail = await getProjectDetail(params.slug);
  return (
    <>
      <Container data-aos="fade-up">
        <BackButton url="/projects" />
        <PageHeading title={detail.title} description={detail.description} />
        <ProjectDetail {...detail} />
      </Container>
    </>
  );
}

async function getProjectDetail(slug: string): Promise<IProjectItem> {
  const response = await prisma.projects.findUnique({
    where: { slug },
  });
  if (!response) return {} as IProjectItem;
  return response;
}