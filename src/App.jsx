import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Check, ChevronDown, CircleDollarSign, ClipboardList, Download, FilePlus2, FileText, Gift, HandHeart, HeartHandshake, LayoutDashboard, LockKeyhole, LogIn, LogOut, Mail, MapPin, Menu, Plus, Printer, Search, ShieldCheck, Sparkles, Users, Wallet, X, Copy, ExternalLink } from 'lucide-react'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const siteBase = import.meta.env.BASE_URL
const asset = name => `${siteBase}assets/${name}`
const configured = !!url && !!key && !url.includes('YOUR_PROJECT')
const supabase = configured ? createClient(url,key) : null
const statuses = ['Draft','Prepared','Sent','Acknowledged','Follow-up','Pledged','Partially Received','Received','Declined','Closed']
const emptyLetter = {recipient_name:'',position:'',organization:'',address:'',contact:'',officer_in_charge:'',requested_support:'',date_issued:'',delivery_method:'',status:'Draft',follow_up_date:'',notes:'',solicitation_type:'General'}
const emptyDonation = {solicitation_id:'',donation_type:'Cash',status:'Pledged',amount:'',description:'',quantity:'',received_date:'',reference_number:''}
const peso = n => new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:2}).format(Number(n||0))
const displayDate = d => d ? new Date(d+'T12:00:00').toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}) : '—'
const csvEscape = val => '"'+String(val??'').replaceAll('"','""')+'"'
function downloadCSV(filename,headers,rows){ const content='\uFEFF'+[headers,...rows].map(row=>row.map(csvEscape).join(',')).join('\r\n'); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'}));a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000) }
function Brand({light=false}){return <div className={'brand '+(light?'brand-light':'')}><div className="brand-mark"><HeartHandshake size={24}/></div><div><strong>AMiCUS <span>Outreach</span></strong><small>UP MANILA · VOY 2026</small></div></div>}
function Toast({message,onClose}){return message?<div className="toast" role="status"><Check size={18}/>{message}<button onClick={onClose} aria-label="Dismiss"><X size={14}/></button></div>:null}
function PublicPage({onLogin}){
  return <div className="public-page">
    <header className="public-header">
      <div className="container nav-inner">
        <Brand/>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#activities">Activities</a>
          <a href="#partners">Partners</a><a href="#officers">Officers</a>
          <a href="#support">Support</a><a href="?page=pharmacy">For pharmacies</a><a href="?page=business">For businesses</a>
        </nav>
        <button className="btn btn-outline small" onClick={onLogin}><LockKeyhole size={15}/> Officer portal</button>
      </div>
    </header>

    <main>
      <section className="hero hero-enhanced">
        <div className="container hero-content hero-content-enhanced">
          <div className="hero-main">
            <div className="eyebrow"><span className="eyebrow-dot"/> NOVEMBER 1–7, 2026 · ABUYOG, LEYTE</div>
            <h1>VOY: AWAKEN 2026<br/><em>Community Health Outreach</em></h1>
            <p>
              Welcome to the public page of the <strong>AMiCUS UP Manila × AMSN Philippines × Voice of Youth</strong>
              collaboration for Abuyog, Leyte. This site introduces our outreach, medical mission, volunteer effort,
              and ways partners can help support the community.
            </p>
            <div className="hero-buttons">
              <a className="btn btn-primary" href="#about">Explore the outreach <ArrowRight size={17}/></a>
              <a className="btn btn-ghost" href="#support">Become a partner</a>
            </div>
            <div className="hero-tags">
              <span><CalendarDays size={16}/> Nov 1–7, 2026</span>
              <span><MapPin size={16}/> Brgy. Tinali-an, Abuyog, Leyte</span>
              <span><HeartHandshake size={16}/> Youth-led faith and service initiative</span>
            </div>
          </div>

          <div className="outreach-hero-photo">
            <img src={`${import.meta.env.BASE_URL}assets/outreach-community-group.jpg`} alt="Abuyog District volunteers and community members at a previous outreach"/>
            <span>FROM OUR PREVIOUS ABUYOG OUTREACH</span>
          </div>
        </div>
      </section>

      <section className="impact-ribbon"><div className="container impact-grid"><div><strong>1–7 NOV</strong><span>Community outreach week</span></div><div><strong>200+</strong><span>Target unique beneficiaries</span></div><div><strong>₱50,000</strong><span>Proposed funding goal</span></div><div><strong>30</strong><span>Approx. medical student volunteers</span></div></div></section><section id="about" className="section container">
        <div className="section-heading">
          <div>
            <span className="overline">ABOUT THE OUTREACH</span>
            <h2>Faith in action. Care for our community.</h2>
          </div>
          <p>
            Through compassionate service, youth involvement, and accessible health education, we hope to reach families in Barangay Tinali-an. Community members may join the health outreach regardless of their religious beliefs or participation in VOY activities.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature">
            <span className="feature-icon"><Sparkles/></span>
            <h3>Voice of Youth: AWAKEN</h3>
            <p>Nightly evangelistic and youth-centered meetings from November 1–7, 2026, starting 5:30 PM onwards.</p>
          </article>
          <article className="feature">
            <span className="feature-icon"><HandHeart/></span>
            <h3>Medical mission and health outreach</h3>
            <p>Basic screening, health education, selected consultations and referrals, depending on confirmed staffing and coordination.</p>
          </article>
          <article className="feature">
            <span className="feature-icon"><Users/></span>
            <h3>Student and youth collaboration</h3>
            <p>AMiCUS UP Manila, AMSN Philippines, and local Adventist youth working together for faith-based compassionate service.</p>
          </article>
        </div>
      </section>

      <section id="partners" className="section muted-section">
        <div className="container">
          <div className="section-heading compact-heading">
            <div>
              <span className="overline">OUR PARTNERS</span>
              <h2>Organizations behind the outreach</h2>
            </div>
            <p>Meet the organizations working together for community service, health, and hope.</p>
          </div>

          <div className="partner-logos-grid">
            <article className="partner-logo-card partner-logo-wide">
              <div className="split-partners"><img src={`${import.meta.env.BASE_URL}assets/amicus-logo.png`} alt="AMiCUS logo"/><img src={`${import.meta.env.BASE_URL}assets/amsn-logo.png`} alt="Adventist Medical Students Network Philippines logo"/></div>
              <div>
                <h3>AMiCUS UP Manila and AMSN Philippines</h3>
                <p>Student volunteers bringing medical knowledge, compassion, and community partnerships together.</p>
              </div>
            </article>
            <article className="partner-logo-card partner-logo-tall">
              <img src={`${import.meta.env.BASE_URL}assets/voy-logo.png`} alt="Voice of Youth logo"/>
              <div>
                <h3>Voice of Youth</h3>
                <p>The evangelistic and community engagement arm of the outreach, centered on the 2026 AWAKEN theme.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="activities" className="section container">
        <div className="section-heading compact-heading">
          <div>
            <span className="overline">WHAT TO EXPECT</span>
            <h2>A week of service and fellowship</h2>
          </div>
          <p>From evening gatherings to practical health education and coordinated volunteer work, there are many ways to take part.</p>
        </div>

        <div className="gallery-grid">
          <article className="gallery-card">
            <div className="gallery-image"><img src={`${import.meta.env.BASE_URL}assets/outreach-youth-talk.jpg`} alt="Speaker leading a youth-oriented talk at a previous outreach in Abuyog" loading="lazy"/></div>
            <div className="gallery-copy">
              <h3>Nightly VOY meetings</h3>
              <p>Evening sessions focused on hope, faith, and transformation under the AWAKEN campaign theme.</p>
            </div>
          </article>
          <article className="gallery-card">
            <div className="gallery-image"><img src={`${import.meta.env.BASE_URL}assets/outreach-children.jpg`} alt="Volunteer facilitating an interactive session with children at a previous Abuyog outreach" loading="lazy"/></div>
            <div className="gallery-copy">
              <h3>Student-led medical outreach</h3>
              <p>Volunteer officers and partners coordinate outreach services, sponsorships, and community health activities.</p>
            </div>
          </article>
          <article className="gallery-card text-card">
            <div className="gallery-copy full-copy">
              <span className="overline">PLANNED SERVICES</span>
              <h3>Health screening, education, and support</h3>
              <ul className="bullet-list">
                <li>Registration and community assistance</li>
                <li>Basic vital signs and selected screening</li>
                <li>Health education and counseling</li>
                <li>Medication or supply assistance as available</li>
                <li>Referrals and follow-up coordination</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="section previous-outreach-section container" aria-labelledby="outreach-history-heading">
        <div className="section-heading compact-heading"><div><span className="overline">PREVIOUS COMMUNITY SERVICE</span><h2 id="outreach-history-heading">Moments from Abuyog District outreach</h2></div><p>Real photographs from previous Abuyog outreach activities. These document past efforts and are not photos of the upcoming November 2026 medical mission.</p></div>
        <div className="history-photo-grid">
          <figure><img src={`${import.meta.env.BASE_URL}assets/outreach-volunteers.jpg`} alt="Abuyog District volunteers gathered for Global Youth Day 2026" loading="lazy"/><figcaption>Volunteers coming together in service</figcaption></figure>
          <figure><img src={`${import.meta.env.BASE_URL}assets/outreach-community-group.jpg`} alt="Volunteers and community members with relief supplies during previous Abuyog outreach" loading="lazy"/><figcaption>Community participation and shared support</figcaption></figure>
        </div>
      </section>

      <section id="officers" className="section officers-section muted-section">
        <div className="container">
          <span className="overline">AMiCUS UP MANILA</span>
          <h2>Meet our officers</h2>
          <p className="officers-intro">Meet the AMiCUS UP Manila Executive Board for Academic Year 2026–2027.</p>
          <figure className="officers-chart-image" style={{margin:'28px 0 0'}}>
            <img src={asset('amicus-executive-board-2026-2027.png')} alt="AMiCUS UP Manila Executive Board for Academic Year 2026–2027, featuring officers and faculty adviser" loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:'18px',boxShadow:'0 14px 44px rgba(10,40,40,.12)'}} />
            <figcaption style={{marginTop:'12px',fontSize:'12px',color:'#667b73'}}>Official AMiCUS UP Manila Executive Board • A.Y. 2026–2027</figcaption>
          </figure>
        </div>
      </section>

      <section id="schedule" className="section muted-section">
        <div className="container">
          <span className="overline">EVENTS & ACTIVITIES</span>
          <h2>One week. Meaningful impact.</h2>
          <div className="schedule-grid">
            <div className="schedule-card accent">
              <span className="schedule-number">01—07</span>
              <h3>Voice of Youth: AWAKEN</h3>
              <p>November 1–7, 2026</p>
              <div className="schedule-meta"><CalendarDays size={17}/> Evening program · From 5:30 PM</div>
              <div className="schedule-meta"><MapPin size={17}/> Barangay Tinali-an, Abuyog, Leyte</div>
            </div>
            <div className="schedule-card">
              <span className="schedule-number">TBA</span>
              <h3>Community Medical Mission</h3>
              <p>One morning during November 1–7</p>
              <div className="schedule-meta"><CalendarDays size={17}/> Exact date dependent on physician availability</div>
              <div className="schedule-meta"><MapPin size={17}/> Proposed: Barangay Covered Court</div>
            </div>
            <div className="schedule-card">
              <span className="schedule-number">01—07</span>
              <h3>Daily Health Education</h3>
              <p>Practical community health learning</p>
              <div className="schedule-meta"><BadgeCheck size={17}/> Screening and talks as staffing permits</div>
              <div className="schedule-meta"><ShieldCheck size={17}/> Confirmed services to be announced</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="solicitations"><span className="overline">PARTNERSHIP PATHWAYS</span><h2>Choose how you can help.</h2><p>Explore the sponsorship options tailored to different partners. Recipient-specific requests are sent privately by our officers.</p><div className="pathway-grid"><a className="pathway-card" href="?page=pharmacy"><span className="feature-icon"><Gift/></span><h3>Pharmacy & healthcare suppliers</h3><p>Medical consumables, appropriate medicines and vitamins, and professional support under authorized clinical arrangements.</p><strong>View pharmacy sponsorship <ArrowRight size={16}/></strong></a><a className="pathway-card" href="?page=business"><span className="feature-icon"><HeartHandshake/></span><h3>Businesses & community partners</h3><p>Support volunteer meals, water, groceries, transport, logistics, printing, and the evening outreach program.</p><strong>View business sponsorship <ArrowRight size={16}/></strong></a></div></section>
      <section id="support" className="section container support-section">
        <div className="support-copy">
          <span className="overline">BECOME A PARTNER</span>
          <h2>Small acts of generosity.<br/><em>Lasting community impact.</em></h2>
          <p>We welcome conversations about in-kind supplies, medicines through authorized channels, screening materials, groceries for families, snacks or meals for volunteers and beneficiaries, and monetary support.</p>
          <p>To coordinate sponsorships or request an official solicitation letter, please contact the organizing team through your existing AMiCUS/VOY organizers. Verified payment instructions and official contact channels should only be published once approved.</p>
          <div className="support-note"><ShieldCheck size={20}/><span>This site does not collect online payments. Donations are coordinated directly with authorized organizers and verified by the appointed treasurer.</span></div>
        </div>
        <div className="support-visual">
          <div className="support-icon"><Gift size={40}/></div>
          <h3>Support the outreach</h3>
          <p>Supplies · Volunteer meals · Community groceries · Health services</p>
          <div className="support-divider"/>
          <strong>AMiCUS UP Manila × AMSN Philippines × Voice of Youth</strong>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="container footer-inner">
        <Brand light/>
        <p>Service with faith. Care with compassion.<br/>© 2026 AMiCUS Outreach. Event details subject to confirmation.</p>
      </div>
    </footer>
  </div>
}

function PartnerPage({kind,onHome,onLogin}){
 const pharmacy=kind==='pharmacy';
 const title=pharmacy?'Pharmacy & healthcare sponsorship':'Business & community sponsorship';
 const needs=pharmacy?['Examination gloves, gauze, cotton, masks and 70% alcohol','Appropriate vitamins, oral rehydration salts and approved first-aid materials','Medicine donations only after review of expiry, storage and clinical suitability','Qualified pharmacist involvement for inventory and dispensing arrangements']:['Meals, snacks and drinking water for volunteers and beneficiaries','Groceries and appropriate in-kind support for community members','Transportation, printing, equipment loans and venue logistics','Financial sponsorship for approved project needs'];
 return <div className="public-page"><header className="public-header"><div className="container nav-inner"><Brand/><button className="btn btn-outline small" onClick={onHome}><ArrowLeft size={16}/> Back to home</button></div></header><main><section className="partner-hero"><div className="container partner-hero-inner"><div><span className="overline">VOY 2026 · SUPPORT OUR MISSION</span><h1>{title}</h1><p>Help us reach approximately 200 community beneficiaries in Barangay Tinali-an, Abuyog, Leyte, November 1–7, 2026.</p><a href="#partner-details" className="btn btn-primary">Explore priority needs <ArrowRight size={16}/></a></div><img src={asset('outreach-community-group.jpg')} alt="Original photograph from past Abuyog youth outreach"/></div></section><section id="partner-details" className="section container"><span className="overline">HOW YOU CAN HELP</span><h2>{pharmacy?'Priority pharmacy and healthcare needs':'Priority community and business needs'}</h2><div className="needs-grid">{needs.map((n,i)=><div className="need-card" key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{n}</p></div>)}</div><div className="partner-notice"><ShieldCheck size={22}/><p>{pharmacy?'Donated medicines are subject to suitability, expiry, storage, and professional review. Dispensing only through authorized arrangements. Specialized services depend on confirmed professionals and approval.':'Gifts may support the medical mission, Voice of Youth evening program, or general approved operations. We account for these purposes separately.'}</p></div></section><section className="section muted-section"><div className="container partner-bottom"><div><span className="overline">PROJECT OVERVIEW</span><h2>Serving with compassion, bringing hope and healing.</h2><p>Our preliminary fundraising target is ₱50,000. The program combines basic health screening, preventive education, and nightly Voice of Youth messages beginning at 5:30 PM. Medical consultations and additional services remain subject to confirmation.</p><p>To receive a letter addressed to your organization, contact our organizing team. Officers can generate a unique, personalized sponsor link through the private portal.</p><a className="btn btn-primary" href="mailto:amicus.upmanila@gmail.com?subject=VOY%202026%20Sponsorship%20Request">Request an addressed letter <Mail size={16}/></a></div><img src={asset('outreach-volunteers.jpg')} alt="Original volunteer photo from previous Abuyog outreach"/></div></section></main><footer className="footer"><div className="container footer-inner"><Brand light/><p>VOY 2026 · Barangay Tinali-an, Abuyog, Leyte</p></div></footer></div>
}
function DonorResponse({token,record}) {
 const [kind,setKind]=useState('Cash'),[purpose,setPurpose]=useState('Community Medical Mission'),[donor,setDonor]=useState(''),[email,setEmail]=useState(''),[amount,setAmount]=useState(''),[details,setDetails]=useState(''),[reference,setReference]=useState(''),[file,setFile]=useState(null),[consent,setConsent]=useState(false),[sending,setSending]=useState(false),[receiptId,setReceiptId]=useState(''),[status,setStatus]=useState(null),[lookup,setLookup]=useState(''),[msg,setMsg]=useState('');
 async function submit(e){e.preventDefault(); if(!supabase||sending)return;setSending(true);setMsg('');try{
  let proof=null;
  if(file){if(file.size>5*1024*1024)throw Error('Maximum proof file size is 5 MB.');if(!['image/jpeg','image/png','application/pdf'].includes(file.type))throw Error('Please upload JPG, PNG, or PDF only.');const ext=file.type==='application/pdf'?'pdf':file.type==='image/png'?'png':'jpg'; proof=`${crypto.randomUUID()}.${ext}`;const upload=await supabase.storage.from('donation-proofs').upload(proof,file,{contentType:file.type,upsert:false});if(upload.error)throw upload.error;}
  const result=await supabase.rpc('submit_sponsor_response',{p_token:token,p_donor_name:donor.trim(),p_email:email.trim(),p_kind:kind,p_purpose:purpose,p_amount:kind==='Cash'?Number(amount):null,p_details:details.trim(),p_reference:reference.trim(),p_proof_path:proof,p_consent:consent});if(result.error)throw result.error;
  setReceiptId(result.data);setLookup(result.data);setMsg('Submitted for review. Save your tracking reference below. This is not yet a payment receipt.');
 }catch(err){setMsg(err.message||'Submission failed. Please contact the organizers.')}finally{setSending(false)}}
 async function check(){setMsg('');const res=await supabase.rpc('sponsor_response_status',{p_token:token,p_submission_id:lookup.trim()});if(res.error){setMsg('Unable to check status.');return}setStatus(res.data?.[0]||null);if(!res.data?.length)setMsg('Reference not found for this solicitation.');}
 return <section className="donor-section" id="donate"><span className="overline">REPLY TO YOUR INVITATION</span><h2>Respond or donate</h2><p>Thank you for considering this sponsorship invitation. You may pledge support or submit a donation for treasurer verification.</p>
 <div className="donation-payment"><div><h3>How to donate</h3><p>Transfer your donation to the project's listed GoTyme account, or scan the payment QR using your banking app.</p><p><strong>Bank:</strong> GoTyme<br/><strong>Account name:</strong> Chelsea Joy B. Redondo<br/><strong>Account number:</strong> 0143-1671-4802</p><p className="disclaimer">Please verify these payment details with the organizers before transferring funds. Never share an OTP or banking password.</p></div><img src={asset('gotyme-donation-qr.png')} alt="GoTyme payment QR provided by the outreach finance team"/></div>
 {receiptId?<div className="donor-confirmation"><strong>Thank you — submission received for review</strong><p>Save this private tracking reference:</p><code>{receiptId}</code><button className="btn btn-outline small" onClick={()=>navigator.clipboard?.writeText(receiptId)}>Copy tracking reference</button><p>Only verified donations can produce a contribution acknowledgment. Check your status below.</p></div>:<form onSubmit={submit} className="donor-form"><div className="form-grid"><label className="field"><span>Response type</span><select value={kind} onChange={e=>setKind(e.target.value)}><option>Cash</option><option>In-kind</option><option>Pledge only</option><option>Decline</option></select></label><label className="field"><span>Donation purpose</span><select value={purpose} onChange={e=>setPurpose(e.target.value)}><option>Community Medical Mission</option><option>Voice of Youth 2026 Program</option><option>General Project Support</option></select></label><Input label="Your name / organization" required maxLength={150} value={donor} onChange={e=>setDonor(e.target.value)}/><Input label="Email (optional)" type="email" maxLength={200} value={email} onChange={e=>setEmail(e.target.value)}/>{kind==='Cash'&&<Input label="Amount in PHP" type="number" min="1" step="0.01" required value={amount} onChange={e=>setAmount(e.target.value)}/>}<Input label="Transaction / transfer reference (optional)" maxLength={100} value={reference} onChange={e=>setReference(e.target.value)}/><div className="span-2"><Input label="Message / donated items / pledge details" textarea required={kind==='In-kind'||kind==='Pledge only'} maxLength={1500} value={details} onChange={e=>setDetails(e.target.value)}/></div><label className="field span-2"><span>Proof of donation (optional; JPG, PNG, PDF; max 5 MB)</span><input type="file" accept="image/png,image/jpeg,application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/></label></div><label className="donor-consent"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)}/> I consent to the organizing team processing the details submitted here for donation verification and follow-up.</label><button className="btn btn-primary" disabled={sending}>{sending?'Submitting…':'Send response for verification'} <ArrowRight size={16}/></button></form>}
 <div className="donor-check"><h3>Check submission / get acknowledgment</h3><p>Enter the tracking reference saved when you submitted your response. An acknowledgment is available only after treasurer verification.</p><div className="donor-check-row"><input placeholder="Submission UUID" value={lookup} onChange={e=>setLookup(e.target.value)}/><button className="btn btn-outline" disabled={!lookup||!supabase} onClick={check}>Check status</button></div>{status&&<div className="donor-confirmation"><strong>Status: {status.status}</strong>{status.status==='Verified'?<><p>Contribution acknowledgment #{status.acknowledgment_number}</p><p><strong>{status.donor_name}</strong> · {status.donation_kind==='Cash'?peso(status.amount):status.details} · {status.purpose}</p><button className="btn btn-primary small" onClick={()=>window.print()}><Printer size={15}/> Print / save acknowledgment</button><p className="disclaimer">Acknowledgment of verified contribution only — not an official tax receipt.</p></>:<p>{status.status==='Rejected'?'Please contact the organizing team about your submission.':'Your response has been received but is not yet verified.'}</p>}</div>}</div>{msg&&<p role="status" className="alert subtle">{msg}</p>}
 </section>
}
function SponsorRequest({token,onHome}){
 const [record,setRecord]=useState(null),[busy,setBusy]=useState(true),[error,setError]=useState('');
 useEffect(()=>{let active=true;if(!supabase){setError('Personalized requests are not enabled yet. Please contact the organizing team.');setBusy(false);return;}supabase.rpc('public_solicitation_by_token',{p_token:token}).then(({data,error:e})=>{if(!active)return;setBusy(false);if(e)setError('Request unavailable. Please contact the organizing team.');else if(!data?.length)setError('This solicitation link is invalid or no longer active.');else setRecord(data[0]);});return()=>{active=false}},[token]);
 return <div className="sponsor-page"><header className="public-header"><div className="container nav-inner"><Brand/><button onClick={onHome} className="btn btn-outline small"><ArrowLeft size={16}/> Public website</button></div></header><main className="container sponsor-wrap"><div className="sponsor-header"><div><span className="overline">PERSONALIZED SPONSORSHIP REQUEST</span><h1>Be part of hope and healing.</h1><p>Voice of Youth 2026: AWAKEN × Community Health Outreach and Medical Mission</p></div></div>{busy?<p className="sponsor-message">Loading your personalized request…</p>:error?<div className="alert">{error}</div>:<article className="sponsor-letter"><div className="sponsor-letter-top"><span>October 2026</span><strong>{record.control_number}</strong></div><h2>{record.solicitation_type==='Pharmacy'?'Request for Medical Supplies and Medicine Sponsorship':record.solicitation_type==='Business'?'Request for Community Sponsorship and Support':'Invitation to Partner With Us'}</h2><p className="recipient-block"><strong>{record.recipient_name}</strong>{record.position&&<span>{record.position}</span>}{record.organization&&<span>{record.organization}</span>}</p><p>Dear {record.recipient_name},</p><p>Warm greetings!</p><p>The Adventist Youth – Abuyog District, in collaboration with AMiCUS UP Manila and the Adventist Medical Students Network–UP (AMSN-UP), is organizing <strong>Voice of Youth 2026: AWAKEN × Community Health Outreach and Medical Mission</strong> on November 1–7, 2026 in Barangay Tinali-an, Abuyog, Leyte.</p><p>We aim to reach approximately 200 community members through basic health screening, preventive health education, and referral support. Additional consultations and specialized services depend on the availability of qualified healthcare professionals, appropriate resources, and approvals.</p><p>{record.solicitation_type==='Pharmacy'?'We respectfully request appropriate medical supplies, vitamins, consumables or other healthcare support. All medical products will be screened and managed through authorized clinical and pharmacy arrangements.':record.solicitation_type==='Business'?'We respectfully request your support through volunteer meals and refreshments, groceries for community beneficiaries, logistical assistance, or financial and in-kind contributions.':'We respectfully invite you to support this initiative through financial assistance, in-kind donations, or community partnership.'}</p>{record.requested_support&&<div className="request-highlight"><span>SUPPORT REQUESTED FOR YOU</span><strong>{record.requested_support}</strong></div>}<p>Our proposed project budget is ₱50,000. Priority needs include screening supplies, hygiene materials, education and referral forms, volunteer meals, drinking water, transport assistance, and approved medical supplies.</p><p>All contributions are documented and acknowledged following verification. Donations intended for healthcare activities are tracked separately from Voice of Youth program support. Any public recognition of donors requires their consent.</p><p>Thank you for considering this invitation to serve the community of Abuyog.</p><p>Respectfully yours,</p><div className="signature-grid"><p><strong>Cheribelle D. Miraflores</strong><span>President, Adventist Youth – Abuyog District</span></p><p><strong>Glister Diadem A. Dollera</strong><span>Main Project Coordinator</span><span>Chairperson, AMiCUS UP Manila</span></p></div><p className="noted-title"><strong>Noted by:</strong></p><div className="signature-grid"><p><strong>Pastor Joseph D. Monsales</strong><span>District Pastor, Seventh-day Adventist Church – Abuyog District</span></p><p><strong>Dr. Angelita C. Jaya</strong><span>Faculty Adviser, AMiCUS UP Manila</span></p></div><p className="approval-note">Names and titles are displayed for reference only. This digital request is not a signed or officially endorsed PDF. Request the separately approved and signed PDF from the organizing team.</p><DonorResponse token={token} record={record}/><div className="sponsor-actions"><a className="btn btn-primary" href="mailto:amicus.upmanila@gmail.com?subject=VOY%202026%20Sponsorship%20Inquiry">Contact the organizers <Mail size={16}/></a><button className="btn btn-outline" onClick={()=>window.print()}><Printer size={16}/> Print request</button></div><p className="disclaimer">This webpage is a personalized digital request, not an official receipt or a payment portal. Please verify donation instructions directly with the organizers. For signed letters, request the authorized PDF copy.</p></article>}</main></div>
}
function Modal({title,children,onClose}){return <div className="modal-shade" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="modal" role="dialog" aria-modal="true" aria-label={title}><div className="modal-heading"><h3>{title}</h3><button className="icon-button" onClick={onClose} aria-label="Close"><X size={20}/></button></div><div className="modal-content">{children}</div></div></div>}
function Input({label,textarea=false,required=false,...props}){return <label className="field"><span>{label}{required&&' *'}</span>{textarea?<textarea required={required} {...props}/>:<input required={required} {...props}/>}</label>}
function Select({label,options,...props}){return <label className="field"><span>{label}</span><select {...props}>{options.map(x=><option key={x} value={x}>{x}</option>)}</select></label>}
function Login({onBack}){const[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);async function submit(e){e.preventDefault();if(!supabase)return;setBusy(true);setError('');const {error:err}=await supabase.auth.signInWithPassword({email,password});if(err)setError(err.message);setBusy(false)}return <div className="login-bg"><div className="login-top"><Brand light/><button className="link-light" onClick={onBack}><ArrowLeft size={16}/> Back to public site</button></div><div className="login-card"><div className="login-icon"><LockKeyhole size={25}/></div><span className="overline">OFFICER ACCESS</span><h1>Welcome back.</h1><p>Sign in to manage outreach solicitations, pledges, and donations.</p>{!configured?<div className="alert">Supabase is not configured yet. Follow README.md to create the database and add environment variables.</div>:<form onSubmit={submit}><Input label="Officer email" value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" required placeholder="officer@example.com"/><Input label="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" autoComplete="current-password" required placeholder="Your account password"/>{error&&<div className="alert">{error}</div>}<button className="btn btn-primary btn-full" disabled={busy}>{busy?'Signing in…':'Sign in securely'} <ArrowRight size={17}/></button></form>}<div className="login-footer">Accounts are created by the portal administrator. <strong>No public registration.</strong></div></div></div>}
function LetterForm({initial,onSubmit,onClose,busy}){const[f,setF]=useState({...emptyLetter,...initial});const set=(k,v)=>setF(prev=>({...prev,[k]:v}));return <form onSubmit={e=>{e.preventDefault();onSubmit(f)}}><div className="form-grid"><Input required label="Recipient / business name" value={f.recipient_name} onChange={e=>set('recipient_name',e.target.value)}/><Input label="Position / designation" value={f.position||''} onChange={e=>set('position',e.target.value)}/><Select label="Solicitation category" options={['General','Pharmacy','Business']} value={f.solicitation_type||'General'} onChange={e=>set('solicitation_type',e.target.value)}/><Input label="Company / organization" value={f.organization||''} onChange={e=>set('organization',e.target.value)}/><Input required label="Officer-in-charge" value={f.officer_in_charge||''} onChange={e=>set('officer_in_charge',e.target.value)}/><div className="span-2"><Input label="Complete address" value={f.address||''} onChange={e=>set('address',e.target.value)}/></div><Input label="Contact details" value={f.contact||''} onChange={e=>set('contact',e.target.value)}/><Input label="Requested support" value={f.requested_support||''} onChange={e=>set('requested_support',e.target.value)} placeholder="e.g., groceries, ₱5,000, medical supplies"/><Input label="Date issued" type="date" value={f.date_issued||''} onChange={e=>set('date_issued',e.target.value)}/><Input label="Delivery method" value={f.delivery_method||''} onChange={e=>set('delivery_method',e.target.value)} placeholder="Email / In person / Messenger"/><Select label="Letter status" options={statuses} value={f.status} onChange={e=>set('status',e.target.value)}/><Input label="Follow-up date" type="date" value={f.follow_up_date||''} onChange={e=>set('follow_up_date',e.target.value)}/><div className="span-2"><Input label="Remarks / next steps" textarea rows="3" value={f.notes||''} onChange={e=>set('notes',e.target.value)}/></div></div><div className="form-actions"><button className="btn btn-outline" type="button" onClick={onClose}>Cancel</button><button className="btn btn-primary" disabled={busy}>{busy?'Saving…':'Save solicitation'} <Check size={17}/></button></div></form>}
function DonationForm({letters,onSubmit,onClose,busy}){const[f,setF]=useState({...emptyDonation,solicitation_id:letters[0]?.id||''});const set=(k,v)=>setF(prev=>({...prev,[k]:v}));return <form onSubmit={e=>{e.preventDefault();onSubmit(f)}}><div className="form-grid"><div className="span-2"><label className="field"><span>Linked solicitation *</span></label><select className="standalone-select" required value={f.solicitation_id} onChange={e=>set('solicitation_id',e.target.value)}>{letters.map(l=><option key={l.id} value={l.id}>{l.control_number} — {l.recipient_name}</option>)}</select></div><Select label="Contribution type" options={['Cash','In-kind']} value={f.donation_type} onChange={e=>set('donation_type',e.target.value)}/><Select label="Status" options={['Pledged','Received','Cancelled']} value={f.status} onChange={e=>set('status',e.target.value)}/>{f.donation_type==='Cash'&&<Input label="Amount (PHP)" type="number" step="0.01" min="0" required value={f.amount} onChange={e=>set('amount',e.target.value)}/>}<Input label="Date received" type="date" value={f.received_date} onChange={e=>set('received_date',e.target.value)}/><div className="span-2"><Input label="Description / donated items" required={f.donation_type==='In-kind'} value={f.description} onChange={e=>set('description',e.target.value)} placeholder="e.g., 50 packed meals"/></div><Input label="Quantity (for in-kind)" value={f.quantity} onChange={e=>set('quantity',e.target.value)}/><Input label="Acknowledgment reference" value={f.reference_number} onChange={e=>set('reference_number',e.target.value)} placeholder="Optional unique reference"/></div><div className="alert subtle">A pledge is not counted as received money. Use “Received” only after the authorized treasurer has verified the contribution. Acknowledgments are not official tax receipts.</div><div className="form-actions"><button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary" disabled={busy||!letters.length}>{busy?'Saving…':'Save contribution'} <Check size={17}/></button></div></form>}
function Acknowledgment({donation,letter,onClose}){const received=donation.status==='Received';return <Modal title="Acknowledgment preview" onClose={onClose}><div className="receipt-print"><div className="receipt-head"><HeartHandshake/><div><strong>AMiCUS OUTREACH</strong><p>VOY AWAKEN 2026 × Community Medical Mission</p></div></div><h2>{received?'Contribution Acknowledgment':'Pledge Acknowledgment'}</h2><p>This acknowledges {received?'receipt of the following contribution':'the following pledged contribution'} in support of the November 2026 community outreach in Barangay Tinali-an, Abuyog, Leyte.</p><dl><dt>Donor / recipient</dt><dd>{letter?.recipient_name||'—'}</dd><dt>Solicitation reference</dt><dd>{letter?.control_number||'—'}</dd><dt>Contribution reference</dt><dd>{donation.reference_number||donation.id.slice(0,8).toUpperCase()}</dd><dt>Contribution</dt><dd>{donation.donation_type==='Cash'?peso(donation.amount):`${donation.description||'In-kind support'}${donation.quantity?' · '+donation.quantity:''}`}</dd><dt>Status</dt><dd>{donation.status}</dd><dt>Date received</dt><dd>{displayDate(donation.received_date)}</dd></dl><p className="receipt-foot">Internal acknowledgment only. Not an official receipt, tax deduction certificate, or proof of payment unless verified by the authorized treasurer. Please retain relevant supporting documents.</p></div><div className="form-actions"><button className="btn btn-outline" onClick={onClose}>Close</button><button className="btn btn-primary" onClick={()=>window.print()}><Printer size={17}/> Print / Save PDF</button></div></Modal>}
function ResponseReview({canRecord,toast}){const[rows,setRows]=useState([]),[busy,setBusy]=useState(false);const load=async()=>{const r=await supabase.from('sponsor_responses').select('id,created_at,donor_name,email,kind,purpose,amount,details,reference,proof_path,status,solicitation_id,acknowledgment_number').order('created_at',{ascending:false});if(r.error)toast(r.error.message);else setRows(r.data||[])};useEffect(()=>{load()},[]);async function approve(id,action){if(!canRecord)return;setBusy(true);const r=await supabase.rpc('review_sponsor_response',{p_submission_id:id,p_decision:action});setBusy(false);if(r.error)toast(r.error.message);else toast(action==='Verified'?'Donation verified; acknowledgment enabled':'Response marked rejected');load()};async function proof(path){const r=await supabase.storage.from('donation-proofs').createSignedUrl(path,60);if(r.error)toast(r.error.message);else window.open(r.data.signedUrl,'_blank','noopener,noreferrer')};return <div className="panel"><div className="panel-heading"><div><h2>Sponsor replies & proof of donation</h2><p>Review submissions before issuing acknowledgments. Files are private.</p></div><button className="btn btn-outline small" onClick={load}>Refresh</button></div><div className="table-scroll"><table><thead><tr><th>Received</th><th>Donor</th><th>Contribution</th><th>Proof</th><th>Status</th><th>Review</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{new Date(r.created_at).toLocaleDateString()}</td><td><strong>{r.donor_name}</strong><div className="td-sub">{r.email}</div></td><td>{r.kind==='Cash'?peso(r.amount):r.kind}<div className="td-sub">{r.purpose} · {r.details}</div></td><td>{r.proof_path?<button className="text-button" onClick={()=>proof(r.proof_path)}>View proof</button>:'—'}</td><td>{r.status}{r.acknowledgment_number&&<div className="td-sub">{r.acknowledgment_number}</div>}</td><td>{r.status==='Pending'&&canRecord?<div className="table-actions"><button className="text-button" disabled={busy} onClick={()=>approve(r.id,'Verified')}>Verify</button><button className="text-button" disabled={busy} onClick={()=>approve(r.id,'Rejected')}>Reject</button></div>:'—'}</td></tr>)}</tbody></table>{!rows.length&&<div className="empty-state">No sponsor responses yet.</div>}</div></div>}
function Dashboard({session,onExit,toast}){const [profile,setProfile]=useState(null),[letters,setLetters]=useState([]),[donations,setDonations]=useState([]),[view,setView]=useState('overview'),[search,setSearch]=useState(''),[filter,setFilter]=useState('All statuses'),[modal,setModal]=useState(null),[editing,setEditing]=useState(null),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true),[error,setError]=useState(''),[printDonation,setPrintDonation]=useState(null),[menuOpen,setMenuOpen]=useState(false)
 const load=useCallback(async()=>{setLoading(true);let [p,l,d]=await Promise.all([supabase.from('profiles').select('id,email,full_name,role').eq('id',session.user.id).single(),supabase.from('solicitations').select('*').order('created_at',{ascending:false}),supabase.from('donations').select('*').order('created_at',{ascending:false})]);if(p.error||l.error||d.error)setError([p.error?.message,l.error?.message,d.error?.message].filter(Boolean).join(' · '));else setError('');setProfile(p.data||null);setLetters(l.data||[]);setDonations(d.data||[]);setLoading(false)},[session.user.id]);useEffect(()=>{load()},[load]);
 const canRecord=profile?.role==='admin'||profile?.role==='treasurer';const isAdmin=profile?.role==='admin';const canEditLetter=l=>isAdmin||l.created_by===session.user.id;
 const byId=useMemo(()=>Object.fromEntries(letters.map(x=>[x.id,x])),[letters]);const cash=donations.filter(d=>d.donation_type==='Cash');const receivedCash=cash.filter(d=>d.status==='Received').reduce((s,d)=>s+Number(d.amount||0),0);const pledgedCash=cash.filter(d=>d.status==='Pledged').reduce((s,d)=>s+Number(d.amount||0),0);const receivedInKind=donations.filter(d=>d.donation_type==='In-kind'&&d.status==='Received').length;const filtered=letters.filter(l=>{const t=[l.control_number,l.recipient_name,l.organization,l.address,l.officer_in_charge].join(' ').toLowerCase();return t.includes(search.toLowerCase())&&(filter==='All statuses'||l.status===filter)});
 async function saveLetter(f){setBusy(true);const fields=Object.fromEntries(Object.entries(f).filter(([k])=>Object.keys(emptyLetter).includes(k)).map(([k,v])=>[k,v===''?null:v]));const res=editing?await supabase.from('solicitations').update(fields).eq('id',editing.id):await supabase.from('solicitations').insert(fields);setBusy(false);if(res.error){toast(res.error.message);return}setModal(null);setEditing(null);toast(editing?'Solicitation updated':'Solicitation added; control number generated');load()}
 async function saveDonation(f){setBusy(true);const payload={...f,amount:f.donation_type==='Cash'?Number(f.amount):null,received_date:f.received_date||null,reference_number:f.reference_number||null,quantity:f.quantity||null,description:f.description||null};const res=await supabase.from('donations').insert(payload);setBusy(false);if(res.error){toast(res.error.message);return}setModal(null);toast('Contribution recorded');load()}
 function exportLetters(){downloadCSV('AMiCUS_solicitations.csv',['Control number','Recipient','Position','Organization','Address','Contact','Officer-in-charge','Requested support','Date issued','Delivery method','Status','Follow-up','Notes','Created at'],filtered.map(l=>[l.control_number,l.recipient_name,l.position,l.organization,l.address,l.contact,l.officer_in_charge,l.requested_support,l.date_issued,l.delivery_method,l.status,l.follow_up_date,l.notes,l.created_at]));toast('CSV exported')}
 function exportDonations(){downloadCSV('AMiCUS_donations.csv',['Solicitation control','Recipient','Type','Status','Amount PHP','Description','Quantity','Date received','Acknowledgment reference'],donations.map(d=>[byId[d.solicitation_id]?.control_number,byId[d.solicitation_id]?.recipient_name,d.donation_type,d.status,d.amount,d.description,d.quantity,d.received_date,d.reference_number]));toast('Donation CSV exported')}
 const copySponsorLink=async l=>{const link=`${window.location.origin}${window.location.pathname}?sponsor=${encodeURIComponent(l.public_token)}`;try{await navigator.clipboard.writeText(link);toast(`Personalized link copied for ${l.recipient_name}`)}catch{window.prompt('Copy this personalized sponsor link:',link)}};
 const nav=[['overview',LayoutDashboard,'Overview'],['letters',ClipboardList,'Solicitation letters'],['donations',Wallet,'Donations & pledges'],['responses',Mail,'Sponsor responses']];
 return <div className="dashboard"><aside className={'sidebar '+(menuOpen?'sidebar-open':'')}><div className="sidebar-brand"><Brand light/></div><div className="sidebar-label">MANAGEMENT</div><nav>{nav.map(([id,Icon,label])=><button key={id} className={'side-link '+(view===id?'active':'')} onClick={()=>{setView(id);setMenuOpen(false)}}><Icon size={19}/>{label}</button>)}</nav><div className="sidebar-bottom"><div className="side-note"><ShieldCheck size={20}/><strong>Secure by design</strong><span>Officer records are protected by account-based access policies.</span></div><button className="side-link" onClick={onExit}><ArrowLeft size={18}/> Public website</button><button className="side-link" onClick={()=>supabase.auth.signOut()}><LogOut size={18}/> Sign out</button></div></aside><div className="dashboard-main"><div className="dash-topbar"><button className="icon-button hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu/></button><span className="breadcrumbs">AMiCUS Outreach <span>/</span> {nav.find(n=>n[0]===view)?.[2]}</span><div className="user-chip"><div className="avatar">{(profile?.full_name||session.user.email||'O').charAt(0).toUpperCase()}</div><div><strong>{profile?.full_name||session.user.email}</strong><span>{profile?.role||'Loading account...'}</span></div></div></div><div className="dash-body">{error&&<div className="alert">{error} — Please confirm schema.sql has been run and your officer account is authorized.</div>}{view==='responses'?<><div className="page-heading"><h1>Sponsor responses</h1></div><ResponseReview canRecord={canRecord} toast={toast}/></>:view==='overview'?<><div className="page-heading"><div><span className="overline">CAMPAIGN DASHBOARD</span><h1>Outreach at a glance</h1><p>Voice of Youth: AWAKEN × Community Medical Mission</p></div><button className="btn btn-primary" onClick={()=>{setEditing(null);setModal('letter')}}><Plus size={18}/> New solicitation</button></div><div className="stats-grid"><div className="stat-card"><div className="stat-label">Solicitation letters <FileText size={19}/></div><strong>{letters.length}</strong><span>Total registered</span></div><div className="stat-card"><div className="stat-label">Cash received <CircleDollarSign size={19}/></div><strong>{peso(receivedCash)}</strong><span>Verified as received</span></div><div className="stat-card"><div className="stat-label">Cash pledged <HandHeart size={19}/></div><strong>{peso(pledgedCash)}</strong><span>Not yet received</span></div><div className="stat-card"><div className="stat-label">In-kind received <Gift size={19}/></div><strong>{receivedInKind}</strong><span>Recorded contributions</span></div></div><div className="panel"><div className="panel-heading"><div><h2>Recent solicitations</h2><p>Latest requests assigned to your officers</p></div><button className="btn btn-outline small" onClick={()=>setView('letters')}>View all <ArrowRight size={16}/></button></div><LetterTable rows={letters.slice(0,6)} canEditLetter={canEditLetter} onEdit={l=>{setEditing(l);setModal('letter')}} loading={loading} onCopyLink={copySponsorLink}/></div><div className="helper-strip"><CalendarDays/><div><strong>Next milestone · November 1–7, 2026</strong><span>VOY nightly at 5:30 PM; medical mission morning schedule subject to provider confirmation.</span></div></div></>:view==='letters'?<><div className="page-heading"><div><span className="overline">SOLICITATION MANAGEMENT</span><h1>Letter registry</h1><p>Track every request from draft to donation acknowledgment.</p></div><button className="btn btn-primary" onClick={()=>{setEditing(null);setModal('letter')}}><Plus size={18}/> New letter</button></div><div className="panel"><div className="table-toolbar"><label className="search-field"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search control number, name, officer..."/></label><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All statuses</option>{statuses.map(s=><option key={s}>{s}</option>)}</select><button className="btn btn-outline small" onClick={exportLetters}><Download size={16}/> Export CSV</button></div><LetterTable rows={filtered} canEditLetter={canEditLetter} onEdit={l=>{setEditing(l);setModal('letter')}} loading={loading} onCopyLink={copySponsorLink}/></div></>:<><div className="page-heading"><div><span className="overline">FINANCIAL RECORDS</span><h1>Donations & pledges</h1><p>Cash and in-kind contributions, recorded separately from pledges.</p></div>{canRecord&&<button className="btn btn-primary" onClick={()=>setModal('donation')} disabled={!letters.length}><Plus size={18}/> Record contribution</button>}</div><div className="stats-grid three"><div className="stat-card"><div className="stat-label">Received cash <Wallet size={19}/></div><strong>{peso(receivedCash)}</strong></div><div className="stat-card"><div className="stat-label">Cash pledges <HandHeart size={19}/></div><strong>{peso(pledgedCash)}</strong></div><div className="stat-card"><div className="stat-label">In-kind donations <Gift size={19}/></div><strong>{receivedInKind}</strong></div></div><div className="panel"><div className="panel-heading"><div><h2>Contribution ledger</h2><p>Only the treasurer or admin can create records.</p></div><button className="btn btn-outline small" onClick={exportDonations}><Download size={16}/> Export CSV</button></div><div className="table-scroll"><table><thead><tr><th>Solicitation</th><th>Type</th><th>Amount / item</th><th>Status</th><th>Received date</th><th>Acknowledgment</th></tr></thead><tbody>{donations.map(d=><tr key={d.id}><td><strong>{byId[d.solicitation_id]?.control_number||'—'}</strong><div className="td-sub">{byId[d.solicitation_id]?.recipient_name||'—'}</div></td><td>{d.donation_type}</td><td>{d.donation_type==='Cash'?peso(d.amount):<span>{d.description||'—'}{d.quantity?' · '+d.quantity:''}</span>}</td><td><span className={'status '+d.status.toLowerCase().replaceAll(' ','-')}>{d.status}</span></td><td>{displayDate(d.received_date)}</td><td><button className="text-button" onClick={()=>setPrintDonation(d)}><Printer size={15}/> Preview / print</button></td></tr>)}</tbody></table>{!loading&&donations.length===0&&<div className="empty-state"><Gift size={30}/><strong>No contributions recorded yet</strong><p>Pledges and received support will appear here.</p></div>}</div></div></>}</div></div>{modal==='letter'&&<Modal title={editing?`Edit ${editing.control_number}`:'New solicitation letter'} onClose={()=>{setModal(null);setEditing(null)}}><LetterForm key={editing?.id||'new'} initial={editing} busy={busy} onClose={()=>{setModal(null);setEditing(null)}} onSubmit={saveLetter}/></Modal>}{modal==='donation'&&<Modal title="Record a contribution" onClose={()=>setModal(null)}><DonationForm letters={letters} busy={busy} onClose={()=>setModal(null)} onSubmit={saveDonation}/></Modal>}{printDonation&&<Acknowledgment donation={printDonation} letter={byId[printDonation.solicitation_id]} onClose={()=>setPrintDonation(null)}/>}</div>}
function LetterTable({rows,onEdit,canEditLetter,loading,onCopyLink}){return <div className="table-scroll"><table><thead><tr><th>Control number</th><th>Recipient / organization</th><th>Officer-in-charge</th><th>Status</th><th>Issued</th><th>Follow-up</th><th></th></tr></thead><tbody>{rows.map(l=><tr key={l.id}><td><strong className="control-num">{l.control_number}</strong></td><td><strong>{l.recipient_name}</strong><div className="td-sub">{l.organization||l.position||'—'}</div></td><td>{l.officer_in_charge}</td><td><span className={'status '+l.status.toLowerCase().replaceAll(' ','-')}>{l.status}</span></td><td>{displayDate(l.date_issued)}</td><td>{displayDate(l.follow_up_date)}</td><td><div className="table-actions">{l.public_token&&<button className="text-button" onClick={()=>onCopyLink(l)} title="Copy personalized sponsor link"><Copy size={14}/> Copy link</button>}{canEditLetter(l)&&<button className="text-button" onClick={()=>onEdit(l)}>Edit <ArrowRight size={15}/></button>}</div></td></tr>)}</tbody></table>{!loading&&rows.length===0&&<div className="empty-state"><ClipboardList size={30}/><strong>No solicitation records found</strong><p>Create a new letter or adjust your search.</p></div>}{loading&&<div className="empty-state">Loading records…</div>}</div>}
export default function App(){const [page,setPage]=useState(new URLSearchParams(window.location.search).has('sponsor')?'sponsor':(['pharmacy','business'].includes(new URLSearchParams(window.location.search).get('page'))?new URLSearchParams(window.location.search).get('page'):'public')),[session,setSession]=useState(null),[ready,setReady]=useState(!configured),[notification,setNotification]=useState('');useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>{setSession(data.session);setReady(true)});const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>{setSession(s)});return ()=>subscription.unsubscribe()},[]);function toast(s){setNotification(s);setTimeout(()=>setNotification(''),6000)}return <>{page==='sponsor'?<SponsorRequest token={new URLSearchParams(window.location.search).get('sponsor')} onHome={()=>{history.replaceState({},'',window.location.pathname);setPage('public')}}/>:(page==='pharmacy'||page==='business')?<PartnerPage kind={page} onHome={()=>{history.replaceState({},'',window.location.pathname);setPage('public')}}/>:page==='public'?<PublicPage onLogin={()=>setPage('login')}/>:!ready?<div className="splash">Loading portal…</div>:session?<Dashboard session={session} onExit={()=>setPage('public')} toast={toast}/>:<Login onBack={()=>setPage('public')}/>}<Toast message={notification} onClose={()=>setNotification('')}/></>}
