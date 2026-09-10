import React, {
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import {
  createRoot,
} from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  ShieldCheck,
  Upload,
  CheckCircle2,
  Clock3,
  BriefcaseBusiness,
  LayoutDashboard,
  UserRound,
  LogOut,
  Menu,
  X,
  LockKeyhole,
  FileCheck2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import "./styles.css";
import logo from "./assets/zeusaberz-logo.png";


// ============================================================
// SUPABASE
// ============================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;


// ============================================================
// AUTH CONTEXT
// ============================================================

const AuthContext = createContext({
  session: null,
  loading: true,
});

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    // Restore existing session when the application loads.
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      setSession(data.session ?? null);
      setLoading(false);
    });

    // Keep React state synchronized with Supabase auth.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;

      setSession(nextSession ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}


// ============================================================
// PROTECTED ROUTES
// ============================================================

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-wrap">
          <div className="auth-panel">
            <div className="eyebrow">
              ZEUSABERZ TESTERS
            </div>

            <h1>Checking your session…</h1>

            <p>
              Please wait while we securely verify your login.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}


// ============================================================
// BRAND
// ============================================================

function Brand({ light = false }) {
  return (
    <Link
      to="/"
      className={`brand ${light ? "brand-light" : ""}`}
    >
      <img
        src={logo}
        alt="ZeusaberZ Testing"
      />

      <span className="brand-text">
        ZEUSABERZ
        <small>TESTING</small>
      </span>
    </Link>
  );
}


// ============================================================
// HEADER
// ============================================================

function Header() {
  const [open, setOpen] = useState(false);
  const { session, loading } = useAuth();

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container nav">
        <Brand />

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav
          className={
            open
              ? "nav-links open"
              : "nav-links"
          }
        >
          <a href="#how" onClick={closeMenu}>
            How it works
          </a>

          <a href="#security" onClick={closeMenu}>
            Security
          </a>

          {!loading && session ? (
            <Link
              to="/dashboard"
              className="btn btn-primary btn-sm"
              onClick={closeMenu}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          ) : !loading ? (
            <>
              <Link
                to="/login"
                className="nav-login"
                onClick={closeMenu}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="btn btn-primary btn-sm"
                onClick={closeMenu}
              >
                Become a tester
                <ArrowRight size={16} />
              </Link>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}


// ============================================================
// HOME
// ============================================================

function Home() {
  return (
    <div className="page">
      <Header />

      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero-grid"></div>
          <div className="hero-glow"></div>

          <div className="container hero-inner">

            <div className="hero-copy-block">

              <div className="eyebrow">
                <span className="pulse"></span>
                ZEUSABERZ TESTERS
              </div>

              <h1>
                BUILD YOUR PROFILE.
                <br />
                <span>GET READY TO TEST.</span>
              </h1>

              <p className="hero-copy">
                Join the ZeusaberZ testing network.
                Create your account, complete secure
                identity verification, and become
                eligible for testing opportunities.
              </p>

              <div className="hero-actions">

                <Link
                  to="/signup"
                  className="btn btn-primary btn-lg"
                >
                  Become a tester
                  <ArrowRight />
                </Link>

                <a
                  href="#how"
                  className="btn btn-ghost btn-lg"
                >
                  How it works
                </a>

              </div>

              <div className="hero-trust">

                <div>
                  <ShieldCheck size={15} />
                  Secure worker verification
                </div>

                <div>
                  <Clock3 size={15} />
                  Flexible opportunities
                </div>

                <div>
                  <LockKeyhole size={15} />
                  Private document handling
                </div>

              </div>
            </div>


            <div className="hero-visual">

              <div className="expertise-panel">

                <div className="expertise-panel-head">
                  <span>Tester Onboarding</span>
                  <b>SECURE</b>
                </div>

                <div className="capability-list">

                  <div className="capability-item">
                    <UserRound size={16} />
                    Create your account
                  </div>

                  <div className="capability-item">
                    <FileCheck2 size={16} />
                    Verify your identity
                  </div>

                  <div className="capability-item">
                    <ShieldCheck size={16} />
                    Join the trusted network
                  </div>

                  <div className="capability-item">
                    <BriefcaseBusiness size={16} />
                    Access eligible work
                  </div>

                </div>

                <div className="mini-process">

                  <div>
                    <span>01</span>
                    <small>REGISTER</small>
                  </div>

                  <div>
                    <span>02</span>
                    <small>VERIFY</small>
                  </div>

                  <div>
                    <span>03</span>
                    <small>TEST</small>
                  </div>

                </div>

                <p className="panel-note">
                  Your verification status controls
                  access to eligible tester opportunities.
                </p>

              </div>

            </div>

          </div>
        </section>


        {/* STATS */}
        <section className="stats-strip">

          <div className="container stats">

            <div>
              <strong>01</strong>
              <span>Register</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Verify</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Get matched</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Complete work</span>
            </div>

          </div>

        </section>


        {/* HOW IT WORKS */}
        <section
          id="how"
          className="section"
        >
          <div className="container">

            <div className="section-heading">

              <div className="eyebrow">
                HOW IT WORKS
              </div>

              <h2>
                Simple for testers.
                <br />
                <span>Serious about quality.</span>
              </h2>

            </div>


            <div className="cards three">

              <InfoCard
                n="01"
                icon={<UserRound />}
                title="Create your account"
                text="Register with your email and build your tester profile."
              />

              <InfoCard
                n="02"
                icon={<FileCheck2 />}
                title="Complete verification"
                text="Securely submit the required identity information before accessing work."
              />

              <InfoCard
                n="03"
                icon={<BriefcaseBusiness />}
                title="Work & submit"
                text="Find eligible projects, follow instructions, and submit quality results."
              />

            </div>

          </div>
        </section>


        {/* SECURITY */}
        <section
          id="security"
          className="section dark-section"
        >

          <div className="container security-grid">

            <div>

              <div className="eyebrow">
                BUILT WITH SECURITY IN MIND
              </div>

              <h2>
                Your identity isn't
                <br />
                <span>public data.</span>
              </h2>

              <p>
                ZeusaberZ separates account data
                from sensitive verification documents.
                Access is controlled, logged, and limited
                to what each workflow needs.
              </p>

              <div className="security-points">

                <div>
                  <ShieldCheck />
                  <span>
                    Private document storage
                  </span>
                </div>

                <div>
                  <LockKeyhole />
                  <span>
                    Authenticated access
                  </span>
                </div>

                <div>
                  <FileCheck2 />
                  <span>
                    Verification status tracking
                  </span>
                </div>

              </div>

            </div>


            <div className="security-card">

              <div className="security-card-top">
                <span>SECURITY LAYER</span>
                <span className="status-dot">
                  ACTIVE
                </span>
              </div>

              <div className="lock-visual">
                <LockKeyhole size={48} />
              </div>

              <div className="security-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <small>
                Documents are never exposed as public files.
              </small>

            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="cta">

          <div className="container cta-box">

            <div>

              <div className="eyebrow">
                READY?
              </div>

              <h2>
                Start your tester journey.
              </h2>

            </div>

            <Link
              to="/signup"
              className="btn btn-primary btn-lg"
            >
              Create account
              <ArrowRight />
            </Link>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}


// ============================================================
// INFO CARD
// ============================================================

function InfoCard({
  n,
  icon,
  title,
  text,
}) {
  return (
    <div className="info-card">

      <div className="card-top">
        <span>{n}</span>
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <ChevronRight className="card-arrow" />

    </div>
  );
}


// ============================================================
// FOOTER
// ============================================================

function Footer() {
  return (
    <footer>

      <div className="container footer-inner">

        <Brand />

        <div>
          © 2026 ZeusaberZ.
          All rights reserved.
        </div>

        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>

      </div>

    </footer>
  );
}


// ============================================================
// AUTH SHELL
// ============================================================

function AuthShell({
  children,
  title,
  subtitle,
}) {
  return (
    <div className="auth-page">

      <div className="auth-brand">
        <Brand />
      </div>

      <div className="auth-wrap">

        <div className="auth-panel">

          <div className="eyebrow">
            ZEUSABERZ TESTERS
          </div>

          <h1>{title}</h1>

          <p>{subtitle}</p>

          {children}

        </div>

      </div>

    </div>
  );
}


// ============================================================
// SIGNUP
// ============================================================

function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");


  async function submit(e) {
    e.preventDefault();

    setError("");

    if (form.password.length < 12) {
      return setError(
        "Password must be at least 12 characters."
      );
    }

    if (form.password !== form.confirm) {
      return setError(
        "Passwords do not match."
      );
    }

    if (!supabase) {
      return setError(
        "Supabase is not connected yet. Add the VITE_SUPABASE_* environment variables first."
      );
    }

    setBusy(true);

    const { error } =
      await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

    setBusy(false);

    if (error) {
      return setError(error.message);
    }

    nav("/check-email");
  }


  return (
    <AuthShell
      title="Become a tester"
      subtitle="Create your account. You'll verify your email before continuing."
    >

      <form
        onSubmit={submit}
        className="form"
      >

        <label>
          Email

          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            placeholder="you@example.com"
          />
        </label>


        <label>
          Password

          <input
            type="password"
            required
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            placeholder="Minimum 12 characters"
          />
        </label>


        <label>
          Confirm password

          <input
            type="password"
            required
            value={form.confirm}
            onChange={(e) =>
              setForm({
                ...form,
                confirm: e.target.value,
              })
            }
            placeholder="Repeat your password"
          />
        </label>


        {error && (
          <div className="form-error">
            {error}
          </div>
        )}


        <button
          className="btn btn-primary btn-full"
          disabled={busy}
        >
          {busy
            ? "Creating account…"
            : "Create account"}

          <ArrowRight size={17} />
        </button>

      </form>


      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login">
          Log in
        </Link>
      </p>

    </AuthShell>
  );
}


// ============================================================
// LOGIN
// ============================================================

function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);


  async function submit(e) {
    e.preventDefault();

    setError("");

    if (!supabase) {
      return setError(
        "Supabase is not connected yet."
      );
    }

    setBusy(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setBusy(false);

    if (error) {
      return setError(error.message);
    }

    nav("/dashboard");
  }


  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to access your tester dashboard."
    >

      <form
        onSubmit={submit}
        className="form"
      >

        <label>
          Email

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
          />
        </label>


        <label>
          Password

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Your password"
          />
        </label>


        {error && (
          <div className="form-error">
            {error}
          </div>
        )}


        <button
          className="btn btn-primary btn-full"
          disabled={busy}
        >
          {busy ? "Logging in…" : "Log in"}
          <ArrowRight size={17} />
        </button>

      </form>


      <p className="auth-switch">
        New to ZeusaberZ?{" "}
        <Link to="/signup">
          Create an account
        </Link>
      </p>

    </AuthShell>
  );
}


// ============================================================
// EMAIL CONFIRMATION
// ============================================================

function CheckEmail() {
  return (
    <AuthShell
      title="Check your email"
      subtitle="We've sent a confirmation link to your email address. Confirm it, then return here to continue."
    >

      <div className="success-box">

        <CheckCircle2 size={34} />

        <strong>
          Email confirmation required
        </strong>

        <span>
          Once confirmed, you can log in
          and complete your tester profile.
        </span>

      </div>


      <Link
        to="/login"
        className="btn btn-primary btn-full"
      >
        Go to login
      </Link>

    </AuthShell>
  );
}


// ============================================================
// DASHBOARD
// ============================================================

function Dashboard() {
  const { session } = useAuth();

  const [kyc] =
    useState("not_started");

  const [loggingOut, setLoggingOut] =
    useState(false);

  const email =
    session?.user?.email || "";

  const initial =
    email
      ? email.charAt(0).toUpperCase()
      : "T";


  async function logout() {
    if (!supabase) return;

    setLoggingOut(true);

    await supabase.auth.signOut();

    setLoggingOut(false);
  }


  return (
    <div className="dashboard">

      <aside className="sidebar">

        <Brand />

        <div className="side-label">
          WORKER
        </div>


        <NavLink
          to="/dashboard"
          className="side-link active"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>


        <NavLink
          to="/profile"
          className="side-link"
        >
          <UserRound size={18} />
          Profile
        </NavLink>


        <div className="side-bottom">

          <button
            className="side-link"
            onClick={logout}
            disabled={loggingOut}
          >
            <LogOut size={18} />

            {loggingOut
              ? "Logging out…"
              : "Log out"}
          </button>

        </div>

      </aside>


      <main className="dash-main">

        <div className="dash-top">

          <div>

            <div className="eyebrow">
              TESTER DASHBOARD
            </div>

            <h1>
              Good to see you.
            </h1>

          </div>


          <div className="avatar">
            {initial}
          </div>

        </div>


        <div className="dash-grid">

          <section className="dash-card hero-dash">

            <div>

              <span className="status-pill">
                ACCOUNT CREATED
              </span>

              <h2>
                Complete your verification.
              </h2>

              <p>
                Your first step is to verify
                your identity. This keeps the
                tester network trusted and helps
                us match you with eligible projects.
              </p>

              <Link
                to="/kyc"
                className="btn btn-primary"
              >
                Start verification
                <ArrowRight size={17} />
              </Link>

            </div>


            <div className="dash-orb">
              <ShieldCheck size={55} />
            </div>

          </section>


          <section className="dash-card">

            <div className="card-title">

              <span>
                Verification
              </span>

              <ShieldCheck />

            </div>


            <div className="progress-row">

              <span className="progress-value">
                {kyc === "verified"
                  ? "100"
                  : "20"}%
              </span>

              <span>
                {kyc === "verified"
                  ? "Verified"
                  : "In progress"}
              </span>

            </div>


            <div className="progress">

              <span
                style={{
                  width:
                    kyc === "verified"
                      ? "100%"
                      : "20%",
                }}
              />

            </div>


            <small>
              Identity verification
            </small>

          </section>


          <section className="dash-card">

            <div className="card-title">

              <span>
                Available work
              </span>

              <BriefcaseBusiness />

            </div>


            <div className="empty-work">

              <Sparkles size={24} />

              <strong>
                No projects yet
              </strong>

              <span>
                Complete your verification
                to unlock eligible opportunities.
              </span>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


// ============================================================
// KYC
// ============================================================

const KYC_WORKER_URL =
  import.meta.env.VITE_KYC_WORKER_URL;

async function kycApi(session, path, options = {}) {
  if (!KYC_WORKER_URL) {
    throw new Error("KYC service URL is not configured.");
  }

  if (!session?.access_token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const response = await fetch(
    `${KYC_WORKER_URL}${path}`,
    {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      "The KYC service returned an error."
    );
  }

  return data;
}

function KYC() {
  const { session } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [kyc, setKyc] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const [identityType, setIdentityType] =
    useState("");

  const [files, setFiles] = useState({
    nid_front: null,
    nid_back: null,
    birth_certificate: null,
    passport: null,
    selfie: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadKyc() {
      setLoading(true);
      setError("");

      try {
        const result = await kycApi(
          session,
          "/kyc/status"
        );

        if (cancelled) return;

        if (result.kyc) {
          setKyc(result.kyc);
          setUploadedDocuments(result.documents || []);

          if (result.kyc.status === "pending") {
            setSubmitted(true);
          }
        } else {
          const started = await kycApi(
            session,
            "/kyc/start",
            { method: "POST" }
          );

          if (cancelled) return;

          setKyc(started.kyc);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load verification."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadKyc();

    return () => {
      cancelled = true;
    };
  }, [session]);

  function pick(key, event) {
    const selected =
      event.target.files?.[0] || null;

    setFiles((current) => ({
      ...current,
      [key]: selected,
    }));

    setError("");
  }

  const identityLabel =
    identityType === "nid"
      ? "National ID (NID)"
      : identityType === "birth_certificate"
        ? "Birth Certificate"
        : identityType === "passport"
          ? "Passport"
          : "";

  const identityKeys =
    identityType === "nid"
      ? ["nid_front", "nid_back"]
      : identityType
        ? [identityType]
        : [];

  const identityComplete =
    identityKeys.length > 0 &&
    identityKeys.every(
      (key) => Boolean(files[key])
    );

  const selfieComplete =
    Boolean(files.selfie);

  async function uploadFile(
    documentType,
    file
  ) {
    const form = new FormData();

    form.append(
      "kyc_id",
      kyc.id
    );

    form.append(
      "document_type",
      documentType
    );

    form.append(
      "file",
      file
    );

    const result = await kycApi(
      session,
      "/kyc/upload",
      {
        method: "POST",
        body: form,
      }
    );

    return result.document;
  }

  async function continueFromIdentity() {
    if (!identityType) {
      setError(
        "Please choose an identity document."
      );
      return;
    }

    if (!identityComplete) {
      setError(
        identityType === "nid"
          ? "Please upload both sides of your NID."
          : `Please upload your ${identityLabel}.`
      );
      return;
    }

    if (!kyc) {
      setError(
        "Your verification session is not ready. Please refresh."
      );
      return;
    }

    setWorking(true);
    setError("");

    try {
      for (const key of identityKeys) {
        const document = await uploadFile(
          key,
          files[key]
        );

        setUploadedDocuments(
          (current) => [
            ...current.filter(
              (item) =>
                item.document_type !== key
            ),
            document,
          ]
        );
      }

      setStep(3);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Identity document upload failed."
      );
    } finally {
      setWorking(false);
    }
  }

  async function continueFromSelfie() {
    if (!selfieComplete) {
      setError(
        "Please upload your selfie."
      );
      return;
    }

    if (!kyc) {
      setError(
        "Your verification session is not ready."
      );
      return;
    }

    setWorking(true);
    setError("");

    try {
      const document = await uploadFile(
        "selfie",
        files.selfie
      );

      setUploadedDocuments(
        (current) => [
          ...current.filter(
            (item) =>
              item.document_type !== "selfie"
          ),
          document,
        ]
      );

      setStep(4);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Selfie upload failed."
      );
    } finally {
      setWorking(false);
    }
  }

  async function submitVerification() {
    if (!consent) {
      setError(
        "Please confirm the consent before submitting."
      );
      return;
    }

    setWorking(true);
    setError("");

    try {
      const result = await kycApi(
        session,
        "/kyc/submit",
        {
          method: "POST",
        }
      );

      setKyc(result.kyc);
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit verification."
      );
    } finally {
      setWorking(false);
    }
  }

  if (loading) {
    return (
      <div className="kyc-page">
        <header className="site-header">
          <div className="container nav">
            <Brand />

            <span className="secure-nav">
              <LockKeyhole size={15} />
              Secure verification
            </span>
          </div>
        </header>

        <div className="kyc-wrap">
          <div className="kyc-card">
            <div className="eyebrow">
              VERIFICATION
            </div>

            <h1>
              Loading verification…
            </h1>

            <p>
              Securely loading your verification session.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted || kyc?.status === "pending") {
    return (
      <div className="kyc-page">
        <header className="site-header">
          <div className="container nav">
            <Brand />

            <span className="secure-nav">
              <LockKeyhole size={15} />
              Secure verification
            </span>
          </div>
        </header>

        <div className="kyc-wrap">
          <div className="kyc-card kyc-success-card">
            <div className="success-icon">
              <CheckCircle2 size={42} />
            </div>

            <div className="eyebrow">
              VERIFICATION SUBMITTED
            </div>

            <h1>
              Under review.
            </h1>

            <p>
              Your identity documents have been securely
              submitted. Our verification team will review
              your application and update your status.
            </p>

            <div className="kyc-status-summary">
              <span>Status</span>
              <strong>PENDING REVIEW</strong>
            </div>

            <Link
              to="/dashboard"
              className="btn btn-primary btn-full"
            >
              Return to dashboard
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stepTitle =
    step === 1
      ? "Choose your document"
      : step === 2
        ? `Upload ${identityLabel}`
        : step === 3
          ? "Upload your selfie"
          : "Review & submit";

  const stepDescription =
    step === 1
      ? "Choose one accepted identity document. You do not need to provide more than one."
      : step === 2
        ? identityType === "nid"
          ? "Upload clear images of the front and back of your NID."
          : `Upload a clear copy of your ${identityLabel}.`
        : step === 3
          ? "Upload a clear selfie so our verification team can compare it with your identity document."
          : "Confirm your information and consent, then submit your verification.";

  function renderUploadField(
    key,
    title,
    accept = ".jpg,.jpeg,.png,.webp,.pdf"
  ) {
    const selected = files[key];

    return (
      <label className="upload-box compact-upload">
        <Upload size={26} />

        <strong>
          {selected
            ? selected.name
            : title}
        </strong>

        <span>
          JPG, PNG, WEBP or PDF · maximum 10 MB
        </span>

        <input
          type="file"
          accept={accept}
          onChange={(event) =>
            pick(key, event)
          }
        />
      </label>
    );
  }

  return (
    <div className="kyc-page">
      <header className="site-header">
        <div className="container nav">
          <Brand />

          <span className="secure-nav">
            <LockKeyhole size={15} />
            Secure verification
          </span>
        </div>
      </header>

      <div className="kyc-wrap">

        <div className="kyc-progress">
          {[1, 2, 3, 4].map(
            (number, index) => (
              <React.Fragment
                key={number}
              >
                <span
                  className={
                    step >= number
                      ? "active"
                      : ""
                  }
                >
                  {String(number).padStart(
                    2,
                    "0"
                  )}
                </span>

                {index < 3 && <i />}
              </React.Fragment>
            )
          )}
        </div>

        <div className="kyc-card">

          <div className="eyebrow">
            IDENTITY VERIFICATION · 0{step}/04
          </div>

          <h1>
            {stepTitle}
          </h1>

          <p>
            {stepDescription}
          </p>

          {error && (
            <div className="kyc-error">
              {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="identity-options">

              <button
                type="button"
                className={
                  identityType === "nid"
                    ? "identity-option selected"
                    : "identity-option"
                }
                onClick={() => {
                  setIdentityType("nid");
                  setError("");
                }}
              >
                <div>
                  <strong>
                    National ID (NID)
                  </strong>

                  <span>
                    Front + back
                  </span>
                </div>

                <ChevronRight size={18} />
              </button>

              <button
                type="button"
                className={
                  identityType ===
                  "birth_certificate"
                    ? "identity-option selected"
                    : "identity-option"
                }
                onClick={() => {
                  setIdentityType(
                    "birth_certificate"
                  );
                  setError("");
                }}
              >
                <div>
                  <strong>
                    Birth Certificate
                  </strong>

                  <span>
                    One document
                  </span>
                </div>

                <ChevronRight size={18} />
              </button>

              <button
                type="button"
                className={
                  identityType === "passport"
                    ? "identity-option selected"
                    : "identity-option"
                }
                onClick={() => {
                  setIdentityType(
                    "passport"
                  );
                  setError("");
                }}
              >
                <div>
                  <strong>
                    Passport
                  </strong>

                  <span>
                    One document
                  </span>
                </div>

                <ChevronRight size={18} />
              </button>

            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="upload-stack">

              {identityType === "nid" ? (
                <>
                  {renderUploadField(
                    "nid_front",
                    "Choose NID front"
                  )}

                  {renderUploadField(
                    "nid_back",
                    "Choose NID back"
                  )}
                </>
              ) : (
                renderUploadField(
                  identityType,
                  `Choose ${identityLabel}`
                )
              )}

            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="upload-stack">
              {renderUploadField(
                "selfie",
                "Choose selfie",
                ".jpg,.jpeg,.png,.webp"
              )}

              <div className="kyc-help">
                <ShieldCheck size={17} />

                <span>
                  Use a recent, clear photo of your face.
                  Avoid sunglasses, masks and heavy shadows.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="review-panel">

              <div className="review-row">
                <span>
                  Identity document
                </span>

                <strong>
                  {identityLabel}
                </strong>
              </div>

              <div className="review-row">
                <span>
                  Identity files
                </span>

                <strong>
                  {identityType === "nid"
                    ? "2 files uploaded"
                    : "1 file uploaded"}
                </strong>
              </div>

              <div className="review-row">
                <span>
                  Selfie
                </span>

                <strong>
                  Uploaded
                </strong>
              </div>

              <label className="consent-check">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) =>
                    setConsent(
                      event.target.checked
                    )
                  }
                />

                <span>
                  I confirm that the information and
                  documents I have provided are mine and
                  accurate, and I consent to ZeusaberZ
                  processing them for identity verification.
                </span>
              </label>

            </div>
          )}

          <div className="kyc-actions">

            {step > 1 ? (
              <button
                className="btn btn-ghost"
                disabled={working}
                onClick={() => {
                  setError("");
                  setStep(step - 1);
                }}
              >
                Back
              </button>
            ) : (
              <Link
                to="/dashboard"
                className="btn btn-ghost"
              >
                Cancel
              </Link>
            )}

            {step === 1 && (
              <button
                className="btn btn-primary"
                disabled={!identityType}
                onClick={() => {
                  setError("");
                  setStep(2);
                }}
              >
                Continue
                <ArrowRight size={17} />
              </button>
            )}

            {step === 2 && (
              <button
                className="btn btn-primary"
                disabled={
                  !identityComplete ||
                  working
                }
                onClick={
                  continueFromIdentity
                }
              >
                {working
                  ? "Uploading…"
                  : "Upload & continue"}

                {!working && (
                  <ArrowRight size={17} />
                )}
              </button>
            )}

            {step === 3 && (
              <button
                className="btn btn-primary"
                disabled={
                  !selfieComplete ||
                  working
                }
                onClick={
                  continueFromSelfie
                }
              >
                {working
                  ? "Uploading…"
                  : "Upload & continue"}

                {!working && (
                  <ArrowRight size={17} />
                )}
              </button>
            )}

            {step === 4 && (
              <button
                className="btn btn-primary"
                disabled={
                  !consent ||
                  working
                }
                onClick={
                  submitVerification
                }
              >
                {working
                  ? "Submitting…"
                  : "Submit verification"}

                {!working && (
                  <CheckCircle2 size={17} />
                )}
              </button>
            )}

          </div>

          <div className="kyc-private-note">
            <LockKeyhole size={14} />
            Your documents are transmitted securely and
            stored in private storage.
          </div>

        </div>
      </div>
    </div>
  );
}


// ============================================================
// APP ROUTES
// ============================================================

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/check-email"
        element={<CheckEmail />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kyc"
        element={
          <ProtectedRoute>
            <KYC />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Home />}
      />

    </Routes>
  );
}


// ============================================================
// START APPLICATION
// ============================================================

createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
