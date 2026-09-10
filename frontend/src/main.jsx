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
  Search,
  Check,
  Ban,
  RefreshCw,
  ExternalLink,
  ClipboardList,
  WalletCards,
  Users,
  ShieldAlert,
  Plus,
  Eye,
  Send,
  CircleDollarSign,
  ArrowUpRight,
} from "lucide-react";

import "./styles.css";
import logo from "./assets/zeusaberz-logo.png";


// ============================================================
// SUPABASE
// ============================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const AUTH_PERSISTENCE_KEY = "zeusaberz_auth_persistence";

function getAuthStorage() {
  if (typeof window === "undefined") return undefined;

  const getStorage = () =>
    window.localStorage.getItem(AUTH_PERSISTENCE_KEY) !== "false"
      ? window.localStorage
      : window.sessionStorage;

  return {
    getItem: (key) => getStorage().getItem(key),
    setItem: (key, value) => getStorage().setItem(key, value),
    removeItem: (key) => {
      window.localStorage.removeItem(key);
      window.sessionStorage.removeItem(key);
    },
  };
}

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          storage: getAuthStorage(),
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
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
  const { session } = useAuth();

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
          <a href="#how">How it works</a>

          <a href="#security">Security</a>

          {session ? (
            <Link
              to="/dashboard"
              className="nav-login"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-login"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="btn btn-primary btn-sm"
                onClick={() => setOpen(false)}
              >
                Become a tester
                <ArrowRight size={16} />
              </Link>
            </>
          )}
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

  const [staySignedIn, setStaySignedIn] =
    useState(() => {
      if (typeof window === "undefined") return true;
      return window.localStorage.getItem(AUTH_PERSISTENCE_KEY) !== "false";
    });

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

    window.localStorage.setItem(
      AUTH_PERSISTENCE_KEY,
      staySignedIn ? "true" : "false"
    );

    if (!staySignedIn) {
      // Remove any previous persistent Supabase session before creating
      // the new session in sessionStorage.
      Object.keys(window.localStorage)
        .filter((key) => key.startsWith("sb-"))
        .forEach((key) => window.localStorage.removeItem(key));
    }

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


        <label className="stay-signed-in">
          <input
            type="checkbox"
            checked={staySignedIn}
            onChange={(e) => setStaySignedIn(e.target.checked)}
          />
          <span>Stay signed in</span>
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

  const [kyc, setKyc] = useState(null);
  const [loadingKyc, setLoadingKyc] = useState(true);

  const [loggingOut, setLoggingOut] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadKycStatus() {
      if (!session) return;

      setLoadingKyc(true);

      try {
        const result = await kycApi(session, "/kyc/status");
        if (!cancelled) setKyc(result.kyc || null);
      } catch (error) {
        console.error("Unable to load KYC status:", error);
      } finally {
        if (!cancelled) setLoadingKyc(false);
      }
    }

    loadKycStatus();

    return () => {
      cancelled = true;
    };
  }, [session]);

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
    window.localStorage.removeItem(AUTH_PERSISTENCE_KEY);

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
                {loadingKyc ? "CHECKING STATUS" : kyc?.status === "pending" || kyc?.status === "under_review" ? "UNDER REVIEW" : kyc?.status === "verified" ? "VERIFIED" : kyc?.status === "rejected" || kyc?.status === "needs_action" ? "ACTION REQUIRED" : "ACCOUNT CREATED"}
              </span>

              <h2>
                {loadingKyc
                  ? "Loading verification status…"
                  : kyc?.status === "pending" || kyc?.status === "under_review"
                    ? "Under Review."
                    : kyc?.status === "verified"
                      ? "Verification complete."
                      : kyc?.status === "rejected" || kyc?.status === "needs_action"
                        ? "Verification needs attention."
                        : "Complete your verification."}
              </h2>

              <p>
                {loadingKyc
                  ? "Checking the latest status of your identity verification."
                  : kyc?.status === "pending" || kyc?.status === "under_review"
                    ? "Your identity documents have been submitted successfully. Our verification team is reviewing your application."
                    : kyc?.status === "verified"
                      ? "Your identity has been verified. You can now access eligible tester opportunities."
                      : kyc?.status === "rejected" || kyc?.status === "needs_action"
                        ? "Your verification requires an update. Open verification to see what needs to be completed."
                        : "Your first step is to verify your identity. This keeps the tester network trusted and helps us match you with eligible projects."}
              </p>

              {kyc?.status !== "pending" && kyc?.status !== "under_review" && kyc?.status !== "verified" && (
                <Link
                  to="/kyc"
                  className="btn btn-primary"
                >
                  {kyc?.status === "rejected" || kyc?.status === "needs_action"
                    ? "Continue verification"
                    : "Start verification"}
                  <ArrowRight size={17} />
                </Link>
              )}

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
                {kyc?.status === "verified"
                  ? "100"
                  : kyc?.status === "pending" || kyc?.status === "under_review"
                    ? "60"
                    : "20"}%
              </span>

              <span>
                {kyc?.status === "verified"
                  ? "Verified"
                  : kyc?.status === "pending" || kyc?.status === "under_review"
                    ? "Under Review"
                    : kyc?.status === "rejected" || kyc?.status === "needs_action"
                      ? "Needs Action"
                      : "In progress"}
              </span>

            </div>


            <div className="progress">

              <span
                style={{
                  width:
                    kyc?.status === "verified"
                      ? "100%"
                      : kyc?.status === "pending" || kyc?.status === "under_review"
                        ? "60%"
                        : "20%",
                }}
              />

            </div>


            <small>
              Identity verification
            </small>

          </section>


          <section className="dash-card dash-work-section">
            <div className="card-title"><span>Available work</span><BriefcaseBusiness /></div>
            {kyc?.status === "verified" ? <WorkerProjects /> : <div className="empty-work"><Sparkles size={24}/><strong>{kyc?.status === "pending" || kyc?.status === "under_review" ? "Verification is under review" : "No projects yet"}</strong><span>{kyc?.status === "pending" || kyc?.status === "under_review" ? "Projects will unlock after your identity verification is approved." : "Complete your verification to unlock eligible opportunities."}</span></div>}
          </section>

        </div>

      </main>

    </div>
  );
}



// ============================================================
// PROFILE
// ============================================================

function Profile() {
  const { session } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [discordName, setDiscordName] = useState("");
  const [phone, setPhone] = useState("");
  const [testerNumber, setTesterNumber] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!session?.user?.id) {
        setLoadingProfile(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, discord_name, phone, tester_number")
        .eq("id", session.user.id)
        .maybeSingle();

      if (cancelled) return;

      if (profileError) {
        setError(profileError.message || "Failed to load your profile.");
      } else if (data) {
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setDiscordName(data.discord_name || "");
        setPhone(data.phone || "");
        setTesterNumber(data.tester_number ?? null);
      }

      setLoadingProfile(false);
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  const profileComplete =
    !!firstName.trim() &&
    !!lastName.trim() &&
    !!discordName.trim() &&
    !!phone.trim();

  async function saveProfile(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const first = firstName.trim();
    const last = lastName.trim();
    const discord = discordName.trim();
    const phoneValue = phone.trim();

    if (!first || !last || !discord || !phoneValue) {
      setError(
        "Please complete all required fields before saving your profile."
      );
      setSaving(false);
      return;
    }

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: first,
        last_name: last,
        discord_name: discord,
        phone: phoneValue,
        full_name: `${first} ${last}`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)
      .select("first_name, last_name, discord_name, phone, tester_number")
      .single();

    if (updateError) {
      setError(updateError.message || "Failed to save your profile.");
    } else {
      setFirstName(data.first_name || first);
      setLastName(data.last_name || last);
      setDiscordName(data.discord_name || discord);
      setPhone(data.phone || phoneValue);
      setTesterNumber(data.tester_number ?? testerNumber);
      setMessage("Your profile has been saved.");
    }

    setSaving(false);
  }

  const email = session?.user?.email || "";
  const initials = `${firstName} ${lastName}`.trim()
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    : email.charAt(0).toUpperCase() || "T";

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Brand />

        <div className="side-label">WORKER</div>

        <NavLink to="/dashboard" className="side-link">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/profile" className="side-link active">
          <UserRound size={18} />
          Profile
        </NavLink>

        <div className="side-bottom">
          <button
            className="side-link"
            onClick={async () => {
              await supabase.auth.signOut();
              window.localStorage.removeItem(AUTH_PERSISTENCE_KEY);
            }}
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="profile-header">
          <div className="profile-heading">
            <span className="eyebrow">
              <span className="pulse"></span>
              ACCOUNT
            </span>

            <h1>Profile</h1>

            <p>
              Keep your tester information up to date. All four fields are
              required to continue with verification.
            </p>
          </div>

          <div className="profile-identity">
            <div className="profile-avatar">{initials}</div>

            <div className="profile-identity-copy">
              <strong>
                {firstName || lastName
                  ? `${firstName} ${lastName}`.trim()
                  : "Tester account"}
              </strong>

              <span>{email}</span>

              {testerNumber ? (
                <small>Tester #{String(testerNumber).padStart(3, "0")}</small>
              ) : (
                <small>Tester number assigned after verification</small>
              )}
            </div>
          </div>
        </div>

        <div className="profile-status">
          <div className={`profile-status-icon ${profileComplete ? "complete" : ""}`}>
            {profileComplete ? (
              <CheckCircle2 size={18} />
            ) : (
              <Clock3 size={18} />
            )}
          </div>

          <div>
            <strong>
              {profileComplete
                ? "Profile complete"
                : "Profile incomplete"}
            </strong>

            <span>
              {profileComplete
                ? "All required tester information has been provided."
                : "Complete all four required fields before starting KYC verification."}
            </span>
          </div>
        </div>

        <div className="profile-page-grid">
          <section className="dash-card profile-form-card">
            <div className="card-title">
              <div>
                <span className="card-kicker">REQUIRED INFORMATION</span>
                <h2>Tester information</h2>
              </div>
              <UserRound size={20} />
            </div>

            {loadingProfile ? (
              <div className="profile-loading">Loading your profile...</div>
            ) : (
              <form className="profile-form" onSubmit={saveProfile}>
                <div className="profile-form-grid">
                  <label className="field">
                    <span>
                      First Name <em>Required</em>
                    </span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setMessage("");
                      }}
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                      maxLength={80}
                      required
                    />
                  </label>

                  <label className="field">
                    <span>
                      Last Name <em>Required</em>
                    </span>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setMessage("");
                      }}
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                      maxLength={80}
                      required
                    />
                  </label>
                </div>

                <label className="field">
                  <span>
                    Discord Name <em>Required</em>
                  </span>
                  <input
                    type="text"
                    value={discordName}
                    onChange={(e) => {
                      setDiscordName(e.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your Discord username"
                    autoComplete="off"
                    maxLength={100}
                    required
                  />
                  <small>
                    Use the Discord name you actively use for tester
                    communication.
                  </small>
                </label>

                <label className="field">
                  <span>
                    Phone Number <em>Required</em>
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setMessage("");
                    }}
                    placeholder="+880 1XXXXXXXXX"
                    autoComplete="tel"
                    maxLength={30}
                    required
                  />
                </label>

                {error && <div className="form-error">{error}</div>}
                {message && <div className="form-success">{message}</div>}

                <div className="profile-form-footer">
                  <span className="required-note">
                    <span>*</span> All fields are required
                  </span>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save changes"}
                    {!saving && <ArrowRight size={16} />}
                  </button>
                </div>
              </form>
            )}
          </section>

          <section className="dash-card account-card">
            <div className="card-title">
              <div>
                <span className="card-kicker">ACCOUNT</span>
                <h2>Account details</h2>
              </div>
              <ShieldCheck size={20} />
            </div>

            <div className="account-details">
              <div className="account-detail">
                <span>Email</span>
                <strong className="account-email">{email || "Not available"}</strong>
              </div>

              <div className="account-detail">
                <span>Tester number</span>
                <strong>
                  {testerNumber
                    ? `#${String(testerNumber).padStart(3, "0")}`
                    : "Not assigned"}
                </strong>
              </div>

              <div className="account-detail">
                <span>Account ID</span>
                <code>{session?.user?.id || "Not available"}</code>
              </div>
            </div>

            <div className="account-note">
              <LockKeyhole size={16} />
              <span>
                Your account ID is system-generated and cannot be changed.
                Your tester number is assigned by an administrator after
                successful verification.
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
  const [profileComplete, setProfileComplete] = useState(true);

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
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name, discord_name, phone")
          .eq("id", session.user.id)
          .maybeSingle();

        if (profileError) {
          throw new Error("Unable to verify your tester profile.");
        }

        const complete =
          !!profile?.first_name?.trim() &&
          !!profile?.last_name?.trim() &&
          !!profile?.discord_name?.trim() &&
          !!profile?.phone?.trim();

        if (!complete) {
          if (!cancelled) {
            setProfileComplete(false);
            setError(
              "Your tester profile is incomplete. First Name, Last Name, Discord Name, and Phone Number are required before KYC verification."
            );
          }
          return;
        }

        if (!cancelled) {
          setProfileComplete(true);
        }

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

  if (!loading && !profileComplete) {
    return (
      <div className="kyc-page">
        <header className="site-header">
          <div className="container nav">
            <Brand />

            <span className="secure-nav">
              <LockKeyhole size={15} />
              Verification setup
            </span>
          </div>
        </header>

        <div className="kyc-wrap">
          <div className="kyc-card kyc-profile-required">
            <div className="eyebrow">
              PROFILE REQUIRED
            </div>

            <h1>
              Complete your tester profile first.
            </h1>

            <p>
              Before you can start KYC verification, you must provide your
              First Name, Last Name, Discord Name, and Phone Number.
            </p>

            <div className="kyc-profile-required-list">
              <span><CheckCircle2 size={15} /> First Name</span>
              <span><CheckCircle2 size={15} /> Last Name</span>
              <span><CheckCircle2 size={15} /> Discord Name</span>
              <span><CheckCircle2 size={15} /> Phone Number</span>
            </div>

            <Link
              to="/profile"
              className="btn btn-primary btn-full"
            >
              Complete profile
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/dashboard"
              className="btn btn-secondary btn-full"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
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
// OPERATIONS API
// ============================================================

async function workerApi(session, path, options = {}) {
  return kycApi(session, path, options);
}

function statusLabel(status) {
  return String(status || "").replaceAll("_", " ").toUpperCase();
}

function AdminOnly({ children }) {
  const { session, loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let alive = true;
    if (!session) {
      setChecking(false);
      return;
    }
    workerApi(session, "/admin/me")
      .then(() => alive && setAllowed(true))
      .catch(() => alive && setAllowed(false))
      .finally(() => alive && setChecking(false));
    return () => { alive = false; };
  }, [session]);

  if (loading || checking) return <div className="auth-page"><div className="auth-wrap"><div className="auth-panel"><div className="eyebrow">ADMIN CONSOLE</div><h1>Checking access…</h1><p>Verifying administrator permissions.</p></div></div></div>;
  if (!session) return <Navigate to="/login" replace />;
  if (!allowed) return <Navigate to="/dashboard" replace />;
  return children;
}

function AdminShell({ children, title = "Operations" }) {
  const { session } = useAuth();
  const navigate = useNavigate();
  async function logout() { if (supabase) await supabase.auth.signOut(); }
  return (
    <div className="dashboard admin-dashboard">
      <aside className="sidebar">
        <Brand />
        <div className="side-label">ADMIN</div>
        <NavLink to="/admin" end className="side-link"><LayoutDashboard size={18}/> Overview</NavLink>
        <NavLink to="/admin/kyc" className="side-link"><ShieldCheck size={18}/> KYC Review</NavLink>
        <NavLink to="/admin/projects" className="side-link"><ClipboardList size={18}/> Projects</NavLink>
        <NavLink to="/admin/work" className="side-link"><Send size={18}/> Work review</NavLink>
        <NavLink to="/admin/payments" className="side-link"><WalletCards size={18}/> Payments</NavLink>
        <div className="side-bottom">
          <button className="side-link" onClick={logout}><LogOut size={18}/> Log out</button>
        </div>
      </aside>
      <main className="dash-main">
        <div className="dash-top"><div><div className="eyebrow">ADMIN CONSOLE</div><h1>{title}</h1></div><div className="admin-top-actions"><button className="btn btn-ghost" onClick={() => navigate("/dashboard")}>Worker view <ArrowUpRight size={16}/></button></div></div>
        {children}
      </main>
    </div>
  );
}

function AdminOverview() {
  const { session } = useAuth();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true); setError("");
    try { setSummary(await workerApi(session, "/admin/summary")); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [session]);
  const cards = [
    ["Total testers", summary?.testers ?? 0, Users],
    ["Pending KYC", summary?.pending_kyc ?? 0, ShieldAlert],
    ["Verified", summary?.verified ?? 0, CheckCircle2],
    ["Open projects", summary?.open_projects ?? 0, BriefcaseBusiness],
    ["Assigned work", summary?.assigned_work ?? 0, ClipboardList],
    ["Pending payments", summary?.pending_payments ?? 0, CircleDollarSign],
  ];
  return <AdminShell title="Operations overview">
    <div className="admin-grid">
      {cards.map(([label, value, Icon]) => <section className="dash-card admin-stat" key={label}><div className="card-title"><span>{label}</span><Icon/></div><strong>{loading ? "—" : value}</strong></section>)}
    </div>
    {error && <div className="kyc-error"><strong>Could not load overview.</strong><span>{error}</span><button className="btn btn-ghost" onClick={load}><RefreshCw size={15}/> Retry</button></div>}
    <section className="dash-card admin-next"><div className="card-title"><span>Recommended workflow</span><ShieldCheck/></div><p>Review pending KYC first, then publish projects, assign eligible testers, review submitted work, and mark approved work for payment.</p><div className="admin-next-links"><Link className="btn btn-primary" to="/admin/kyc">Review KYC <ArrowRight size={16}/></Link><Link className="btn btn-ghost" to="/admin/projects">Manage projects <ArrowRight size={16}/></Link></div></section>
  </AdminShell>;
}

function AdminKyc() {
  const { session } = useAuth();
  const [rows, setRows] = useState([]); const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("pending"); const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [working, setWorking] = useState(false);
  async function load() { setLoading(true); setError(""); try { const q = filter ? `?status=${encodeURIComponent(filter)}` : ""; const data = await workerApi(session, `/admin/kyc${q}`); setRows(data.items || []); } catch(e) { setError(e.message); } finally { setLoading(false); } }
  useEffect(() => { load(); }, [session, filter]);
  async function open(id) { setError(""); try { setSelected((await workerApi(session, `/admin/kyc/${id}`)).item); } catch(e) { setError(e.message); } }
  async function action(action, reason = "") {
    if (!selected) return; setWorking(true); setError("");
    try { const data = await workerApi(session, "/admin/kyc/action", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({kyc_id:selected.kyc.id, action, reason})}); setSelected(data.item); await load(); }
    catch(e) { setError(e.message); } finally { setWorking(false); }
  }
  const filtered = rows.filter(x => `${x.profile?.full_name || ""} ${x.profile?.discord_name || ""} ${x.email || ""} ${x.profile?.tester_number || ""}`.toLowerCase().includes(search.toLowerCase()));
  return <AdminShell title="KYC review">
    <div className="admin-toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tester, email, Discord or number"/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="">All statuses</option><option value="pending">Pending</option><option value="under_review">Under Review</option><option value="needs_action">Needs Action</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select><button className="btn btn-ghost" onClick={load}><RefreshCw size={15}/> Refresh</button></div>
    {error && <div className="kyc-error"><strong>Action failed.</strong><span>{error}</span></div>}
    <div className="admin-split">
      <section className="dash-card admin-list"><div className="card-title"><span>{loading ? "Loading…" : `${filtered.length} submissions`}</span><ShieldCheck/></div>{filtered.map(item=><button key={item.kyc.id} className={`admin-list-row ${selected?.kyc?.id===item.kyc.id?"selected":""}`} onClick={()=>open(item.kyc.id)}><span><strong>{item.profile?.full_name || "Unnamed tester"}</strong><small>{item.email || ""} {item.profile?.tester_number ? `• Tester #${String(item.profile.tester_number).padStart(3,"0")}` : ""}</small></span><em className={`status-${item.kyc.status}`}>{statusLabel(item.kyc.status)}</em></button>)}{!loading&&!filtered.length&&<div className="admin-empty">No submissions match this filter.</div>}</section>
      <section className="dash-card admin-detail">{!selected?<div className="admin-empty"><Eye size={28}/><strong>Select a submission</strong><span>Choose a tester from the list to inspect documents and take action.</span></div>:<KycDetail selected={selected} session={session} working={working} action={action}/>}</section>
    </div>
  </AdminShell>;
}

function KycDetail({ selected, session, working, action }) {
  const { kyc, profile, documents, consents, audit } = selected;
  const [rejectReason, setRejectReason] = useState(kyc.rejection_reason || "");
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState(null);
  async function viewDocument(doc) {
    try { const response = await fetch(`${KYC_WORKER_URL}/admin/kyc/document?path=${encodeURIComponent(doc.storage_path)}`, {headers:{Authorization:`Bearer ${session.access_token}`}}); if(!response.ok) throw new Error("Document could not be opened"); const blob=await response.blob(); const url=URL.createObjectURL(blob); setPreview({url,name:doc.document_type}); } catch(e) { alert(e.message); }
  }
  return <div><div className="detail-head"><div><div className="eyebrow">KYC SUBMISSION</div><h2>{profile?.full_name || "Unnamed tester"}</h2><p>{profile?.discord_name || "No Discord name"} · {profile?.phone || "No phone"}</p></div><span className={`status-badge status-${kyc.status}`}>{statusLabel(kyc.status)}</span></div><div className="detail-grid"><div><span>Tester number</span><strong>{profile?.tester_number ? `#${String(profile.tester_number).padStart(3,"0")}` : "Not assigned"}</strong></div><div><span>Submitted</span><strong>{kyc.submitted_at ? new Date(kyc.submitted_at).toLocaleString() : "—"}</strong></div><div><span>Account</span><strong>{selected.email || "—"}</strong></div></div><div className="detail-section"><div className="card-title"><span>Documents</span><FileCheck2/></div><div className="doc-grid">{documents.map(doc=><button key={doc.id} className="doc-card" onClick={()=>viewDocument(doc)}><FileCheck2 size={20}/><strong>{statusLabel(doc.document_type)}</strong><small>{doc.mime_type} · {Math.round((doc.file_size||0)/1024)} KB</small><span>Open securely <ExternalLink size={13}/></span></button>)}</div></div><div className="detail-section"><div className="card-title"><span>Review action</span><ShieldAlert/></div><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Internal review note (optional)" rows="3"/><textarea value={rejectReason} onChange={e=>setRejectReason(e.target.value)} placeholder="Rejection / needs-action reason" rows="3"/><div className="admin-actions"><button className="btn btn-primary" disabled={working} onClick={()=>action("verify") }><Check size={16}/> Verify & assign number</button><button className="btn btn-ghost" disabled={working} onClick={()=>action("needs_action", rejectReason)}><Send size={16}/> Needs action</button><button className="btn btn-ghost danger-btn" disabled={working} onClick={()=>action("reject", rejectReason)}><Ban size={16}/> Reject</button></div><small>Notes are stored in the audit trail.</small></div><div className="detail-section"><div className="card-title"><span>Audit trail</span><Clock3/></div><div className="audit-list">{audit.map(x=><div key={x.id}><strong>{x.action}</strong><span>{new Date(x.created_at).toLocaleString()}</span></div>)}</div></div>{preview&&<div className="doc-preview"><button className="btn btn-ghost" onClick={()=>{URL.revokeObjectURL(preview.url);setPreview(null)}}>Close preview</button>{preview.url.match(/\.pdf$/i)?<iframe src={preview.url} title={preview.name}/>:<img src={preview.url} alt={preview.name}/>}</div>}</div>;
}

function AdminProjects() {
  const { session } = useAuth(); const [projects,setProjects]=useState([]); const [form,setForm]=useState({title:"",description:"",instructions:"",payout:"",status:"draft"}); const [selected,setSelected]=useState(null); const [error,setError]=useState(""); const [working,setWorking]=useState(false);
  async function load(){try{setProjects((await workerApi(session,"/admin/projects")).items||[])}catch(e){setError(e.message)}} useEffect(()=>{load()},[session]);
  async function save(){setWorking(true);setError("");try{await workerApi(session,"/admin/projects",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,payout:Number(form.payout)||0})});setForm({title:"",description:"",instructions:"",payout:"",status:"draft"});await load()}catch(e){setError(e.message)}finally{setWorking(false)}}
  async function assign(project){const user=prompt("Enter the verified tester's Supabase user ID:");if(!user)return;try{await workerApi(session,"/admin/projects/assign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({project_id:project.id,user_id:user})});alert("Tester assigned.")}catch(e){alert(e.message)}}
  return <AdminShell title="Projects & assignments"><div className="admin-split"><section className="dash-card"><div className="card-title"><span>Create project</span><Plus/></div>{error&&<div className="kyc-error"><span>{error}</span></div>}<input placeholder="Project title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><textarea placeholder="Project description" rows="4" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><textarea placeholder="Tester instructions" rows="5" value={form.instructions} onChange={e=>setForm({...form,instructions:e.target.value})}/><div className="form-grid"><input type="number" min="0" step="0.01" placeholder="Payout" value={form.payout} onChange={e=>setForm({...form,payout:e.target.value})}/><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option value="draft">Draft</option><option value="published">Published</option><option value="paused">Paused</option><option value="closed">Closed</option></select></div><button className="btn btn-primary" disabled={!form.title||working} onClick={save}>{working?"Creating…":"Create project"} <Plus size={16}/></button></section><section className="dash-card admin-list"><div className="card-title"><span>Projects</span><ClipboardList/></div>{projects.map(p=><div className="project-admin-row" key={p.id}><div><strong>{p.title}</strong><small>{statusLabel(p.status)} · {p.payout} {p.currency}</small></div><div><button className="btn btn-ghost" onClick={()=>assign(p)}>Assign tester</button></div></div>)}{!projects.length&&<div className="admin-empty">No projects yet.</div>}</section></div></AdminShell>;
}

function AdminWork() {
  const {session}=useAuth(); const [items,setItems]=useState([]); const [error,setError]=useState(""); const [selected,setSelected]=useState(null);
  async function load(){try{setError("");setItems((await workerApi(session,"/admin/work")).items||[])}catch(e){setError(e.message)}} useEffect(()=>{load()},[session]);
  async function review(action){if(!selected)return;const note=prompt(action==="approve"?"Approval note (optional):":"Reason for rejection:")||"";try{await workerApi(session,"/admin/work/action",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({submission_id:selected.submission.id,action,note})});setSelected(null);load()}catch(e){alert(e.message)}}
  return <AdminShell title="Work review"><div className="admin-toolbar"><span className="admin-toolbar-label">Submitted tester work</span><button className="btn btn-ghost" onClick={load}><RefreshCw size={15}/> Refresh</button></div>{error&&<div className="kyc-error">{error}</div>}<div className="admin-split"><section className="dash-card admin-list"><div className="card-title"><span>{items.length} submissions</span><ClipboardList/></div>{items.map(x=><button className={`admin-list-row ${selected?.submission?.id===x.submission.id?"selected":""}`} key={x.submission.id} onClick={()=>setSelected(x)}><span><strong>{x.project?.title||"Project"}</strong><small>{x.assignment?.user_id} · {statusLabel(x.submission.status)}</small></span><em className={`status-${x.submission.status}`}>{statusLabel(x.submission.status)}</em></button>)}{!items.length&&<div className="admin-empty">No submitted work yet.</div>}</section><section className="dash-card admin-detail">{!selected?<div className="admin-empty"><ClipboardList size={28}/><strong>Select submitted work</strong><span>Review the tester's result before approving it for payment.</span></div>:<div><div className="detail-head"><div><div className="eyebrow">WORK SUBMISSION</div><h2>{selected.project?.title||"Project"}</h2><p>{selected.assignment?.user_id}</p></div><span className={`status-badge status-${selected.submission.status}`}>{statusLabel(selected.submission.status)}</span></div><div className="work-review-content"><pre>{selected.submission.content}</pre></div><div className="admin-actions"><button className="btn btn-primary" onClick={()=>review("approve")}>Approve & create payment <Check size={16}/></button><button className="btn btn-ghost danger-btn" onClick={()=>review("reject")}>Reject <Ban size={16}/></button></div></div>}</section></div></AdminShell>;
}

function AdminPayments() {
  const {session}=useAuth(); const [items,setItems]=useState([]); const [error,setError]=useState("");
  async function load(){try{setItems((await workerApi(session,"/admin/payments")).items||[])}catch(e){setError(e.message)}} useEffect(()=>{load()},[session]);
  async function mark(id,status){try{await workerApi(session,"/admin/payments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});load()}catch(e){alert(e.message)}}
  return <AdminShell title="Payments"><div className="dash-card admin-list"><div className="card-title"><span>Payment queue</span><WalletCards/></div>{error&&<div className="kyc-error">{error}</div>}{items.map(p=><div className="project-admin-row" key={p.id}><div><strong>{p.project_title || "Project"}</strong><small>{p.email || p.user_id} · {p.amount} {p.currency} · {statusLabel(p.status)}</small></div><div>{p.status!=="paid"&&<button className="btn btn-primary" onClick={()=>mark(p.id,"paid")}>Mark paid <Check size={15}/></button>}</div></div>)}{!items.length&&<div className="admin-empty">No payment records yet. Approved work will create them.</div>}</div></AdminShell>;
}

function WorkerProjects() {
  const {session}=useAuth(); const [items,setItems]=useState([]); const [error,setError]=useState(""); const [selected,setSelected]=useState(null); const [content,setContent]=useState(""); const [working,setWorking]=useState(false);
  async function load(){try{setItems((await workerApi(session,"/work")).items||[])}catch(e){setError(e.message)}} useEffect(()=>{load()},[session]);
  async function accept(id){setWorking(true);try{await workerApi(session,"/work/status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({assignment_id:id,status:"accepted"})});load()}catch(e){alert(e.message)}finally{setWorking(false)}}
  async function submit(id){setWorking(true);try{await workerApi(session,"/work/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({assignment_id:id,content})});setContent("");setSelected(null);load()}catch(e){alert(e.message)}finally{setWorking(false)}}
  return <div className="work-list">{error&&<div className="kyc-error"><strong>Could not load work.</strong><span>{error}</span><button className="btn btn-ghost" onClick={load}><RefreshCw size={15}/> Retry</button></div>}{items.map(x=><article className="work-card" key={x.assignment.id}><div><div className="eyebrow">{statusLabel(x.assignment.status)}</div><h3>{x.project.title}</h3><p>{x.project.description}</p><div className="work-meta"><span>{x.project.payout} {x.project.currency}</span><span>{new Date(x.project.created_at).toLocaleDateString()}</span></div></div><div className="work-actions">{x.assignment.status==="assigned"&&<button className="btn btn-primary" onClick={()=>accept(x.assignment.id)}>Accept <ArrowRight size={16}/></button>}{["accepted","in_progress"].includes(x.assignment.status)&&<button className="btn btn-primary" onClick={()=>setSelected(x.assignment.id)}>Submit work <Send size={16}/></button>}{x.assignment.status==="submitted"&&<span className="status-badge status-pending">Submitted</span>}{x.assignment.status==="approved"&&<span className="status-badge status-verified">Approved</span>}</div></article>)}{!items.length&&!error&&<div className="empty-work"><Sparkles size={24}/><strong>No assigned projects</strong><span>New eligible assignments will appear here.</span></div>}{selected&&<div className="work-submit-modal"><div className="dash-card"><div className="card-title"><span>Submit work</span><Send/></div><textarea rows="10" value={content} onChange={e=>setContent(e.target.value)} placeholder="Describe your completed work, findings, links, or results…"/><div className="admin-actions"><button className="btn btn-ghost" onClick={()=>setSelected(null)}>Cancel</button><button className="btn btn-primary" disabled={!content.trim()||working} onClick={()=>submit(selected)}>Submit <Check size={16}/></button></div></div></div>}</div>;
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
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
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

      <Route path="/admin" element={<ProtectedRoute><AdminOnly><AdminOverview /></AdminOnly></ProtectedRoute>} />
      <Route path="/admin/kyc" element={<ProtectedRoute><AdminOnly><AdminKyc /></AdminOnly></ProtectedRoute>} />
      <Route path="/admin/projects" element={<ProtectedRoute><AdminOnly><AdminProjects /></AdminOnly></ProtectedRoute>} />
      <Route path="/admin/work" element={<ProtectedRoute><AdminOnly><AdminWork /></AdminOnly></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute><AdminOnly><AdminPayments /></AdminOnly></ProtectedRoute>} />

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
