import { paramParser, queryParser } from '@/lib/parsers';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/types';

// Making the include dynamically is not productive with Typescript
// because it is not possible to make the return type skipable with the optional args
const richInclude = {
  projects: true,
};

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { session, isAdmin } = await getSession();

    if (!session) {
      throw new Error('Unauthorized request');
    }

    // We lost the type here
    const { searchParams } = req.nextUrl;

    const entries = queryParser(searchParams.toString());
    const where = 'where' in entries ? (entries['where'] as Prisma.UserWhereInput) : {};

    const skip = paramParser(searchParams.get('skip'));
    const take = paramParser(searchParams.get('take'));

    const response = await prisma.user.findMany({
      skip,
      take,
      where: isAdmin ? where : { id: session.user.id },
      include: richInclude,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when query users', error });
  }
}
