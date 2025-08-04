// components/Sidebar.tsx
import { Building, Tags, Utensils, Puzzle, LayoutDashboard } from "lucide-react"; // usando lucide
import Link from "next/link";

const navItems = [
  { label: "Empresas", icon: <Building size={20} />, href: "/empresas" },
  { label: "Categorias", icon: <Tags size={20} />, href: "#" },
  { label: "Produtos", icon: <Utensils size={20} />, href: "/produtos" },
  { label: "Complementos", icon: <Puzzle size={20} />, href: "#" },
  { label: "Grupos de Complementos", icon: <LayoutDashboard size={20} />, href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--color-primary)] text-white flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold">
        Mock<span className="text-[var(--color-secondary)]">Delivery</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-dark)] transition"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

    </aside>
  );
}
