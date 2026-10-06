import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/admin-auth';
import { getAllProjects, saveProject, deleteProject } from '@/lib/data-store';
import { ProjectCaseStudy } from '@/lib/types';

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const projects = await getAllProjects();
  return NextResponse.json({ success: true, projects });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ success: false, message: 'Project title is required' }, { status: 400 });
    }

    const saved = await saveProject(body as ProjectCaseStudy);
    return NextResponse.json({
      success: true,
      message: 'Project saved successfully and synced to live website.',
      project: saved,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to save project';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Project id or slug is required' }, { status: 400 });
    }

    await deleteProject(id);
    return NextResponse.json({ success: true, message: 'Project removed from showcase.' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to delete project';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
