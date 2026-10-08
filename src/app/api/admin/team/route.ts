import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/admin-auth';
import { getAllTeamMembers, saveTeamMember, updateTeamMemberStatus, deleteTeamMember } from '@/lib/data-store';
import { TeamMember, EmployeeStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const members = await getAllTeamMembers();
  return NextResponse.json({ success: true, members });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.name || !body.role) {
      return NextResponse.json({ success: false, message: 'Employee name and role are required' }, { status: 400 });
    }

    const saved = await saveTeamMember(body as Partial<TeamMember>);
    return NextResponse.json({
      success: true,
      message: `Employee "${saved.name}" saved successfully and synced to live website.`,
      member: saved,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to save employee';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, slug, status } = body;

    const identifier = id || slug;
    if (!identifier) {
      return NextResponse.json({ success: false, message: 'Employee id or slug is required' }, { status: 400 });
    }

    if (status) {
      const updated = await updateTeamMemberStatus(identifier, status as EmployeeStatus);
      if (!updated) {
        return NextResponse.json({ success: false, message: 'Employee not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: `Employee "${updated.name}" status updated to "${status}".`,
        member: updated,
      });
    }

    const saved = await saveTeamMember(body as Partial<TeamMember>);
    return NextResponse.json({
      success: true,
      message: `Employee "${saved.name}" updated successfully.`,
      member: saved,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update employee';
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
      return NextResponse.json({ success: false, message: 'Employee id or slug is required' }, { status: 400 });
    }

    await deleteTeamMember(id);
    return NextResponse.json({ success: true, message: 'Employee removed from team roster.' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to delete employee';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
