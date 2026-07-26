import React from 'react'
import { CreditCard, RefreshCw, FileText, Banknote, Gem, Receipt, XCircle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

export default function Billing({
  billingInvoices,
  setBillingInvoices,
  packages,
  setPackages,
  defaultPackages,
  packagesLoading,
  setPackagesLoading,
  agencyWallet,
  activePackages,
  setSelectedInvoice,
  setShowInvoiceModal,
  selectedInvoice,
  showInvoiceModal,
}) {
  const totalInvoiced = billingInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalPaid = billingInvoices.filter((inv) => inv.status === 'Paid').reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalDue = billingInvoices.filter((inv) => inv.status === 'Due' || inv.status === 'Overdue').reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueCount = billingInvoices.filter((inv) => inv.status === 'Overdue').length
  const upcomingDue = billingInvoices.filter((inv) => inv.status === 'Due').length
  const packageRevenue = packages.reduce((sum, pkg) => sum + (pkg.price * pkg.sold), 0)

  const handleRefresh = () => {
    setPackagesLoading(true)
    setTimeout(() => {
      setPackages([...defaultPackages])
      setBillingInvoices([
        { invoiceId: 'INV-001', client: 'Aarav Shrestha', packageName: 'Normal Coin Package', amount: 49.99, issuedDate: '2026-07-17', dueDate: '2026-07-24', status: 'Paid' },
        { invoiceId: 'INV-002', client: 'Sima Koirala', packageName: 'Blue Diamond Package', amount: 89.99, issuedDate: '2026-07-16', dueDate: '2026-07-23', status: 'Due' },
        { invoiceId: 'INV-003', client: 'Jay Patel', packageName: 'Green Diamond Package', amount: 199.99, issuedDate: '2026-07-15', dueDate: '2026-07-22', status: 'Overdue' },
        { invoiceId: 'INV-004', client: 'Nina Tamang', packageName: 'Green Diamond Package', amount: 199.99, issuedDate: '2026-07-14', dueDate: '2026-07-25', status: 'Paid' },
      ])
      setPackagesLoading(false)
    }, 1200)
  }

  return (
    <div className="space-y-6">
      <div style={{
        background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 40%, #E51E25 70%, #dc2626 100%)',
        borderRadius: '1.5rem',
        padding: '1.75rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '30%', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(0,0,0,0.15)', filter: 'blur(35px)' }} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px', padding: '4px 14px', marginBottom: '10px' }}>
              <CreditCard style={{ width: '14px', height: '14px', color: '#000' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>Billing Center</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.2 }}>Billing &amp; Revenue</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', marginTop: '6px' }}>Package billing and invoice management for Diamond Agency</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleRefresh}
              disabled={packagesLoading}
              style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '9px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: packagesLoading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px', opacity: packagesLoading ? 0.7 : 1 }}
              onMouseEnter={(e) => !packagesLoading && (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
            >
              <RefreshCw style={{ width: '13px', height: '13px', color: '#000', animation: packagesLoading ? 'spin 1s linear infinite' : 'none' }} />
              {packagesLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={() => { setSelectedInvoice(billingInvoices[0] || null); setShowInvoiceModal(true); }}
              style={{ background: 'rgba(255,255,255,0.9)', color: '#E51E25', padding: '9px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <FileText style={{ width: '13px', height: '13px', color: '#000' }} /> View Invoices
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Invoiced', value: `$${totalInvoiced.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, grad: 'linear-gradient(135deg, #E51E25, #ff4d53)', glow: 'rgba(229,30,37,0.3)', accent: '#E51E25' },
          { label: 'Total Paid', value: `$${totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, grad: 'linear-gradient(135deg, #10b981, #059669)', glow: 'rgba(16,185,129,0.3)', accent: '#059669' },
          { label: 'Amount Due', value: `$${totalDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, grad: 'linear-gradient(135deg, #f59e0b, #d97706)', glow: 'rgba(245,158,11,0.3)', accent: '#d97706' },
          { label: 'Overdue', value: overdueCount, grad: 'linear-gradient(135deg, #E51E25, #dc2626)', glow: 'rgba(229,30,37,0.3)', accent: '#E51E25' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '1.25rem', padding: '1.4rem 1.25rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${card.glow}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '70px', height: '70px', background: card.grad, borderRadius: '0 1.25rem 0 100%', opacity: 0.12 }} />
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '6px' }}>{card.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{card.value}</div>
            <div style={{ height: '3px', width: '32px', background: card.grad, borderRadius: '99px', marginTop: '10px' }} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        <div style={{ gridColumn: 'span 3', background: '#fff', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #fafafa, #fff5f5)' }}>
            <div>
              <h4 style={{ fontWeight: 800, color: '#0f172a', fontSize: '15px', margin: 0 }}>Invoices</h4>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>Latest billing records from auto-fetched packages.</p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, background: '#fff0f0', color: '#E51E25', padding: '3px 10px', borderRadius: '999px', border: '1px solid #fecaca' }}>{billingInvoices.length} records</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(90deg, #f8fafc, #fff5f5)' }}>
                  {['Invoice', 'Client', 'Package', 'Amount', 'Status', 'Due Date', 'Action'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', whiteSpace: 'nowrap', borderBottom: '2px solid #fee2e2' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {billingInvoices.map((invoice) => {
                  const statusCfg = {
                    Paid: { bg: '#dcfce7', color: '#15803d', dot: '#16a34a' },
                    Due: { bg: '#fef9c3', color: '#a16207', dot: '#ca8a04' },
                    Overdue: { bg: '#fee2e2', color: '#b91c1c', dot: '#ef4444' },
                  }[invoice.status] || { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' }
                  return (
                    <tr key={invoice.invoiceId}
                      style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s', cursor: 'default' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#fff5f5')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#E51E25', fontSize: '12px', background: '#fff0f0', padding: '3px 8px', borderRadius: '6px', border: '1px solid #fecaca' }}>{invoice.invoiceId}</span>
                      </td>
                      <td style={{ padding: '13px 16px', fontWeight: 600, color: '#1e293b' }}>{invoice.client}</td>
                      <td style={{ padding: '13px 16px', color: '#64748b', fontSize: '12px' }}>{invoice.packageName}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>${invoice.amount.toFixed(2)}</span>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', background: statusCfg.bg, color: statusCfg.color, fontWeight: 700, fontSize: '11px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusCfg.dot, flexShrink: 0 }} />
                          {invoice.status}
                        </span>
                      </td>
                      <td style={{ padding: '13px 16px', color: '#94a3b8', fontSize: '12px', whiteSpace: 'nowrap' }}>{invoice.dueDate}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <button
                          onClick={() => { setSelectedInvoice(invoice); setShowInvoiceModal(true); }}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'linear-gradient(135deg, #E51E25, #ff4d53)', color: '#fff', border: 'none', borderRadius: '8px', padding: '5px 12px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 6px rgba(229,30,37,0.35)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ gridColumn: 'span 2', background: 'linear-gradient(160deg, #7f1d1d 0%, #b91c1c 40%, #E51E25 100%)', borderRadius: '1.5rem', padding: '1.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(229,30,37,0.4)' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(0,0,0,0.18)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px', padding: '5px 14px', marginBottom: '16px' }}>
              <Banknote style={{ width: '13px', height: '13px', color: '#000' }} />
              <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>Revenue</span>
            </div>
            <h4 style={{ fontWeight: 900, color: '#fff', fontSize: '1.4rem', margin: '0 0 6px' }}>Package Revenue</h4>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12.5px', margin: '0 0 20px', lineHeight: 1.6 }}>Calculated from auto-fetched diamond package sales and active agency package performance.</p>
            <div style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '14px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Available Balance</div>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#fff', marginTop: '4px' }}>{agencyWallet.coins.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>Coins</div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gem style={{ width: '22px', height: '22px', color: '#000' }} />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                ${packageRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)', marginTop: '6px' }}>Total Package Revenue</div>
            </div>
            <button
              onClick={() => { setSelectedInvoice(billingInvoices[0] || null); setShowInvoiceModal(true); }}
              style={{ width: '100%', background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', padding: '12px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
            >
              <FileText style={{ width: '14px', height: '14px', color: '#000' }} /> View Invoice
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { label: 'Total Packages', value: packages.length },
                { label: 'Active Packages', value: activePackages },
                { label: 'Pending Invoices', value: upcomingDue },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '6px', lineHeight: 1.3 }}>{s.label}</div>
                  <div style={{ fontWeight: 900, fontSize: '1.6rem', color: '#fff' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showInvoiceModal && selectedInvoice && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 32px 80px rgba(0,0,0,0.35)', width: '100%', maxWidth: '560px', overflow: 'hidden', animation: 'slideUp 0.3s ease' }}>
            <div style={{ background: 'linear-gradient(135deg, #7f1d1d, #b91c1c, #E51E25)', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px', padding: '3px 12px', marginBottom: '10px' }}>
                  <Receipt style={{ width: '11px', height: '11px', color: '#000' }} />
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase' }}>Invoice</span>
                </div>
                <h3 style={{ fontWeight: 900, color: '#fff', fontSize: '1.3rem', margin: 0 }}>Invoice Details</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', marginTop: '4px' }}>{selectedInvoice.invoiceId} · {selectedInvoice.client}</p>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '10px', padding: '6px', cursor: 'pointer', color: '#fff', transition: 'all 0.2s', display: 'flex' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}
              >
                <XCircle style={{ width: '18px', height: '18px', color: '#000' }} />
              </button>
            </div>

            {(() => {
              const cfg = {
                Paid: { bg: 'linear-gradient(90deg,#dcfce7,#bbf7d0)', color: '#166534', icon: <CheckCircle2 style={{ width: '16px', height: '16px', color: '#000' }} />, text: 'Payment received — Thank you!' },
                Due: { bg: 'linear-gradient(90deg,#fef9c3,#fde68a)', color: '#92400e', icon: <Clock style={{ width: '16px', height: '16px', color: '#000' }} />, text: 'Payment pending — Please settle before due date.' },
                Overdue: { bg: 'linear-gradient(90deg,#fee2e2,#fecaca)', color: '#991b1b', icon: <AlertTriangle style={{ width: '16px', height: '16px', color: '#000' }} />, text: 'Overdue — Immediate attention required!' },
              }[selectedInvoice.status] || {}
              return cfg.bg ? (
                <div style={{ background: cfg.bg, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', color: cfg.color, fontWeight: 600, fontSize: '12.5px' }}>
                  {cfg.icon} {cfg.text}
                </div>
              ) : null
            })()}

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                {[
                  { label: 'Invoice ID', value: selectedInvoice.invoiceId, mono: true },
                  { label: 'Status', value: selectedInvoice.status, badge: true },
                  { label: 'Client', value: selectedInvoice.client },
                  { label: 'Package', value: selectedInvoice.packageName },
                ].map((field, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '5px' }}>{field.label}</div>
                    {field.badge ? (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                        ...(selectedInvoice.status === 'Paid' ? { background: '#dcfce7', color: '#15803d' } :
                          selectedInvoice.status === 'Due' ? { background: '#fef9c3', color: '#a16207' } :
                            { background: '#fee2e2', color: '#b91c1c' })
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedInvoice.status === 'Paid' ? '#16a34a' : selectedInvoice.status === 'Due' ? '#ca8a04' : '#ef4444', flexShrink: 0 }} />
                        {field.value}
                      </span>
                    ) : (
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px', fontFamily: field.mono ? 'monospace' : undefined }}>{field.value}</div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                {[
                  { label: 'Issued', value: selectedInvoice.issuedDate },
                  { label: 'Due Date', value: selectedInvoice.dueDate },
                  { label: 'Amount', value: `$${selectedInvoice.amount.toFixed(2)}`, big: true },
                ].map((f, i) => (
                  <div key={i} style={{ background: i === 2 ? 'linear-gradient(135deg,#7f1d1d,#E51E25)' : '#f8fafc', border: `1px solid ${i === 2 ? 'transparent' : '#e2e8f0'}`, borderRadius: '12px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: i === 2 ? 'rgba(255,255,255,0.75)' : '#94a3b8', marginBottom: '5px' }}>{f.label}</div>
                    <div style={{ fontWeight: f.big ? 900 : 700, color: f.big ? '#fff' : '#0f172a', fontSize: f.big ? '1.15rem' : '13px', fontFamily: f.big ? 'monospace' : undefined }}>{f.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '6px' }}>Notes</div>
                <div style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6 }}>This invoice is generated from the auto-fetched package billing system. Payment terms are 7 days from issuance.</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', padding: '9px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                >
                  <XCircle style={{ width: '13px', height: '13px', color: '#000' }} /> Close
                </button>
                {selectedInvoice.status !== 'Paid' ? (
                  <button
                    onClick={() => {
                      setBillingInvoices((prev) => prev.map((inv) => inv.invoiceId === selectedInvoice.invoiceId ? { ...inv, status: 'Paid' } : inv))
                      setSelectedInvoice((prev) => ({ ...prev, status: 'Paid' }))
                    }}
                    style={{ background: 'linear-gradient(135deg,#E51E25,#ff4d53)', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(229,30,37,0.4)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <CheckCircle2 style={{ width: '13px', height: '13px', color: '#000' }} /> Mark as Paid
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '9px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '13px' }}>
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: '#000' }} /> Already Paid
                  </div>
                )}
              </div>
            </div>
            <style>{`
              @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
              @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
          </div>
        </div>
      )}
    </div>
  )
}
