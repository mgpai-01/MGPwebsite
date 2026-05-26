'use client'

import { useT } from '@/lib/i18n'

const productHrefs = ['#products', '#products', '#products', '#products']
const companyHrefs = ['#about', '#sustainability', '#industries', '#locations', '#quote']

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-stack-sm">
      <h4 className="font-label-caps text-label-caps uppercase text-primary-fixed-dim tracking-[0.12em]">{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((l) => (
          <li key={l.label}><a href={l.href} className="footer-link font-body-md text-[14px] text-inverse-on-surface/70 hover:text-primary-fixed-dim transition-colors no-underline">{l.label}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { t } = useT()
  const contactItems = [
    { label: '(909) 827-1438', href: 'tel:+19098271438' },
    { label: 'mgp@palletmail.com', href: 'mailto:mgp@palletmail.com' },
    { label: '8386 Sultana Ave, Fontana CA', href: '#locations' },
    { label: '14619 Merrill Ave, Fontana CA', href: '#locations' },
    { label: '1326 W Citrus St, Riverside CA', href: '#locations' },
  ]
  return (
    <footer className="block w-full border-t-4 border-primary bg-inverse-surface text-primary-fixed">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-lg px-gutter py-section-padding w-full max-w-container-max mx-auto">
        <div className="flex flex-col gap-stack-sm">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Manufacturing Green Products" className="h-14 w-14 object-contain" />
            <div className="leading-[1.1]">
              <div className="font-wordmark font-extrabold tracking-tight text-on-primary text-[17px]">Manufacturing</div>
              <div className="font-wordmark font-extrabold tracking-tight text-primary-fixed-dim text-[17px]">Green Products</div>
            </div>
          </div>
          <p className="font-body-md text-[14px] text-inverse-on-surface/60 max-w-xs">{t.footer.blurb}</p>
        </div>
        <FooterColumn title={t.footer.productsTitle} items={t.footer.productLinks.map((label, i) => ({ label, href: productHrefs[i] }))} />
        <FooterColumn title={t.footer.companyTitle} items={t.footer.companyLinks.map((label, i) => ({ label, href: companyHrefs[i] }))} />
        <FooterColumn title={t.footer.contactTitle} items={contactItems} />
      </div>
      <div className="border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-gutter py-stack-md flex flex-col md:flex-row justify-between gap-stack-sm">
          <p className="font-body-md text-[13px] text-inverse-on-surface/40">© {new Date().getFullYear()} Manufacturing Green Products. {t.footer.rights}</p>
          <p className="font-label-caps text-[12px] uppercase tracking-[0.10em] text-inverse-on-surface/40">{t.footer.certs}</p>
        </div>
      </div>
    </footer>
  )
}
