import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getEasyPanelProject } from '@/lib/actions/easypanel';

export const revalidate = 0;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { session, isAdmin } = await getSession();

    const projectId = decodeURIComponent(params.id);

    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id: projectId,
        users: isAdmin ? {} : { some: { id: session.user.id } },
      },
      include: { users: true },
    });

    const easypanelProject = await getEasyPanelProject({ projectName: project.id });

    return NextResponse.json({ project, easypanelProject });
  } catch (error) {
    return NextResponse.json({ message: 'Problem when query Project by Id', error });
  }
}
