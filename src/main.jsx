import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight, ShieldCheck, Upload, CheckCircle2, Clock3, BriefcaseBusiness,
  LayoutDashboard, UserRound, LogOut, Menu, X, LockKeyhole, FileCheck2,
  ChevronRight, Sparkles
} from "lucide-react";
import "./styles.css";
import logo from "./assets/zeusaberz-logo.png";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function Brand({ light=false }) {
  return <Link to="/" className={`brand ${light ? "brand-light":""}`}>
    <img src={logo} alt="ZeusaberZ Testing" />
    <span className="brand-text">ZEUSABERZ<small>TESTING</small></span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="container nav">
      <Brand />
      <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
      <nav className={open ? "nav-links open":"nav-links"}>
        <a href="#how">How it works</a>
        <a href="#security">Security</a>
        <Link to="/login" className="nav-login">Log in</Link>
        <Link to="/signup" className="btn btn-primary btn-sm">Become a tester <ArrowRight size={16}/></Link>
      </nav>
    </div>
  </header>
}

function Home() {
  return <div className="page">
    <Header/>
    <main>
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="container hero-inner">
          <div className="hero-copy-block">
            <div className="eyebrow"><span className="pulse"></span> ZEUSABERZ TESTERS</div>
            <h1>BUILD YOUR PROFILE.<br/><span>GET READY TO TEST.</span></h1>
            <p className="hero-copy">Join the ZeusaberZ testing network. Create your account, complete secure identity verification, and become eligible for testing opportunities.</p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">Become a tester <ArrowRight/></Link>
              <a href="#how" className="btn btn-ghost btn-lg">How it works</a>
            </div>
            <div className="hero-trust">
              <div><ShieldCheck size={15}/> Secure worker verification</div>
              <div><Clock3 size={15}/> Flexible opportunities</div>
              <div><LockKeyhole size={15}/> Private document handling</div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="expertise-panel">
              <div className="expertise-panel-head"><span>Tester Onboarding</span><b>SECURE</b></div>
              <div className="capability-list">
                <div className="capability-item"><UserRound size={16}/> Create your account</div>
                <div className="capability-item"><FileCheck2 size={16}/> Verify your identity</div>
                <div className="capability-item"><ShieldCheck size={16}/> Join the trusted network</div>
                <div className="capability-item"><BriefcaseBusiness size={16}/> Access eligible work</div>
              </div>
              <div className="mini-process">
                <div><span>01</span><small>REGISTER</small></div><div><span>02</span><small>VERIFY</small></div><div><span>03</span><small>TEST</small></div>
              </div>
              <p className="panel-note">Your verification status controls access to eligible tester opportunities.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-strip">
        <div className="container stats">
          <div><strong>01</strong><span>Register</span></div>
          <div><strong>02</strong><span>Verify</span></div>
          <div><strong>03</strong><span>Get matched</span></div>
          <div><strong>04</strong><span>Complete work</span></div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">HOW IT WORKS</div>
            <h2>Simple for testers.<br/><span>Serious about quality.</span></h2>
          </div>
          <div className="cards three">
            <InfoCard n="01" icon={<UserRound/>} title="Create your account" text="Register with your email and build your tester profile."/>
            <InfoCard n="02" icon={<FileCheck2/>} title="Complete verification" text="Securely submit the required identity information before accessing work."/>
            <InfoCard n="03" icon={<BriefcaseBusiness/>} title="Work & submit" text="Find eligible projects, follow instructions, and submit quality results."/>
          </div>
        </div>
      </section>

      <section id="security" className="section dark-section">
        <div className="container security-grid">
          <div>
            <div className="eyebrow">BUILT WITH SECURITY IN MIND</div>
            <h2>Your identity isn't<br/><span>public data.</span></h2>
            <p>ZeusaberZ separates account data from sensitive verification documents. Access is controlled, logged, and limited to what each workflow needs.</p>
            <div className="security-points">
              <div><ShieldCheck/><span>Private document storage</span></div>
              <div><LockKeyhole/><span>Authenticated access</span></div>
              <div><FileCheck2/><span>Verification status tracking</span></div>
            </div>
          </div>
          <div className="security-card">
            <div className="security-card-top"><span>SECURITY LAYER</span><span className="status-dot">ACTIVE</span></div>
            <div className="lock-visual"><LockKeyhole size={48}/></div>
            <div className="security-lines"><span></span><span></span><span></span></div>
            <small>Documents are never exposed as public files.</small>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-box">
          <div><div className="eyebrow">READY?</div><h2>Start your tester journey.</h2></div>
          <Link to="/signup" className="btn btn-primary btn-lg">Create account <ArrowRight/></Link>
        </div>
      </section>
    </main>
    <Footer/>
  </div>
}

function InfoCard({n, icon, title, text}) {
  return <div className="info-card">
    <div className="card-top"><span>{n}</span>{icon}</div>
    <h3>{title}</h3><p>{text}</p><ChevronRight className="card-arrow"/>
  </div>
}

function Footer() {
  return <footer><div className="container footer-inner"><Brand/><div>© 2026 ZeusaberZ. All rights reserved.</div><div className="footer-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Support</a></div></div></footer>
}

function AuthShell({children, title, subtitle}) {
  return <div className="auth-page"><div className="auth-brand"><Brand/></div><div className="auth-wrap">
    <div className="auth-panel">
      <div className="eyebrow">ZEUSABERZ TESTERS</div><h1>{title}</h1><p>{subtitle}</p>{children}
    </div>
  </div></div>
}

function Signup() {
  const nav=useNavigate();
  const [form,setForm]=useState({email:"",password:"",confirm:""});
  const [busy,setBusy]=useState(false), [error,setError]=useState("");
  async function submit(e){
    e.preventDefault(); setError("");
    if(form.password.length<12) return setError("Password must be at least 12 characters.");
    if(form.password!==form.confirm) return setError("Passwords do not match.");
    if(!supabase) return setError("Supabase is not connected yet. Add the VITE_SUPABASE_* environment variables first.");
    setBusy(true);
    const {error}=await supabase.auth.signUp({email:form.email,password:form.password});
    setBusy(false);
    if(error) return setError(error.message);
    nav("/check-email");
  }
  return <AuthShell title="Become a tester" subtitle="Create your account. You'll verify your email before continuing.">
    <form onSubmit={submit} className="form">
      <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
      <label>Password<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Minimum 12 characters"/></label>
      <label>Confirm password<input type="password" required value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} placeholder="Repeat your password"/></label>
      {error&&<div className="form-error">{error}</div>}
      <button className="btn btn-primary btn-full" disabled={busy}>{busy?"Creating account…":"Create account"} <ArrowRight size={17}/></button>
    </form>
    <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
  </AuthShell>
}

function Login() {
  const nav=useNavigate(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState("");
  async function submit(e){e.preventDefault();setError("");if(!supabase)return setError("Supabase is not connected yet.");const {error}=await supabase.auth.signInWithPassword({email,password});if(error)return setError(error.message);nav("/dashboard")}
  return <AuthShell title="Welcome back" subtitle="Log in to access your tester dashboard.">
    <form onSubmit={submit} className="form">
      <label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
      <label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password"/></label>
      {error&&<div className="form-error">{error}</div>}
      <button className="btn btn-primary btn-full">Log in <ArrowRight size={17}/></button>
    </form>
    <p className="auth-switch">New to ZeusaberZ? <Link to="/signup">Create an account</Link></p>
  </AuthShell>
}

function CheckEmail(){return <AuthShell title="Check your email" subtitle="We've sent a confirmation link to your email address. Confirm it, then return here to continue."><div className="success-box"><CheckCircle2 size={34}/><strong>Email confirmation required</strong><span>Once confirmed, you can log in and complete your tester profile.</span></div><Link to="/login" className="btn btn-primary btn-full">Go to login</Link></AuthShell>}

function Dashboard(){
  const [kyc,setKyc]=useState("not_started");
  return <div className="dashboard">
    <aside className="sidebar"><Brand/><div className="side-label">WORKER</div><NavLink to="/dashboard" className="side-link active"><LayoutDashboard size={18}/>Dashboard</NavLink><NavLink to="/profile" className="side-link"><UserRound size={18}/>Profile</NavLink><div className="side-bottom"><button className="side-link"><LogOut size={18}/>Log out</button></div></aside>
    <main className="dash-main"><div className="dash-top"><div><div className="eyebrow">TESTER DASHBOARD</div><h1>Good to see you.</h1></div><div className="avatar">T</div></div>
      <div className="dash-grid">
        <section className="dash-card hero-dash"><div><span className="status-pill">ACCOUNT CREATED</span><h2>Complete your verification.</h2><p>Your first step is to verify your identity. This keeps the tester network trusted and helps us match you with eligible projects.</p><Link to="/kyc" className="btn btn-primary">Start verification <ArrowRight size={17}/></Link></div><div className="dash-orb"><ShieldCheck size={55}/></div></section>
        <section className="dash-card"><div className="card-title"><span>Verification</span><ShieldCheck/></div><div className="progress-row"><span className="progress-value">{kyc==="verified"?"100":"20"}%</span><span>{kyc==="verified"?"Verified":"In progress"}</span></div><div className="progress"><span style={{width:kyc==="verified"?"100%":"20%"}}></span></div><small>Identity verification</small></section>
        <section className="dash-card"><div className="card-title"><span>Available work</span><BriefcaseBusiness/></div><div className="empty-work"><Sparkles size={24}/><strong>No projects yet</strong><span>Complete your verification to unlock eligible opportunities.</span></div></section>
      </div>
    </main>
  </div>
}

function KYC(){
  const [step,setStep]=useState(1); const [files,setFiles]=useState({front:null,back:null,selfie:null});
  const items=[["front","NID front"],["back","NID back"],["selfie","Selfie"]];
  const canNext=step===1?files.front:step===2?files.back:files.selfie;
  function pick(k,e){setFiles({...files,[k]:e.target.files?.[0]||null})}
  return <div className="kyc-page"><header className="site-header"><div className="container nav"><Brand/><span className="secure-nav"><LockKeyhole size={15}/> Secure verification</span></div></header>
    <div className="kyc-wrap"><div className="kyc-progress"><span className="active">01</span><i></i><span className={step>=2?"active":""}>02</span><i></i><span className={step>=3?"active":""}>03</span></div>
      <div className="kyc-card"><div className="eyebrow">IDENTITY VERIFICATION</div><h1>{items[step-1][1]}</h1><p>Upload a clear image. Your document is stored privately and used only for verification.</p>
        <label className="upload-box"><Upload size={28}/><strong>{files[items[step-1][0]]?files[items[step-1][0]].name:"Choose a file"}</strong><span>JPG, PNG or PDF · maximum 10 MB</span><input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e=>pick(items[step-1][0],e)}/></label>
        <div className="kyc-actions">{step>1?<button className="btn btn-ghost" onClick={()=>setStep(step-1)}>Back</button>:<span/>}{step<3?<button className="btn btn-primary" disabled={!canNext} onClick={()=>setStep(step+1)}>Continue <ArrowRight size={17}/></button>:<button className="btn btn-primary" disabled={!canNext} onClick={()=>setStep(4)}>Submit verification <CheckCircle2 size={17}/></button>}</div>
      </div>
    </div>
  </div>
}

function App(){
  return <Routes>
    <Route path="/" element={<Home/>}/><Route path="/signup" element={<Signup/>}/><Route path="/login" element={<Login/>}/><Route path="/check-email" element={<CheckEmail/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/kyc" element={<KYC/>}/>
    <Route path="*" element={<Home/>}/>
  </Routes>
}

createRoot(document.getElementById("root")).render(<BrowserRouter><App/></BrowserRouter>);
