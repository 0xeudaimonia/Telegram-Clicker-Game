import React from "react";
import Link from "next/link";

const AdminLayout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <a>Панель управления</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <a>Пользователи</a>
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
