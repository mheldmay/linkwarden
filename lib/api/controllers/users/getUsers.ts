// Copyright (C) 2022-present Daniel31x13 <daniel31x13@gmail.com>
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import { prisma } from "@/lib/api/db";

export default async function (lookupEmail: string, isSelf: boolean) {
  const user = await prisma.user.findUnique({
    where: {
      email: lookupEmail,
    },
  });

  const data = isSelf
    ? {
        // If user is requesting its data
        id: user?.id,
        name: user?.name,
        email: user?.email,
      }
    : {
        // If user is requesting someone elses data
        id: user?.id,
        name: user?.name,
        email: user?.email,
      };

  const statusCode = user?.id ? 200 : 404;

  return { response: data || null, status: statusCode };
}
