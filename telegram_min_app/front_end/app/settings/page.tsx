"use client";

import Layout from "@/components/Layout";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/UI";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    // Simulate logout
    router.push("/");
  };

  return (
    <Layout showGradients={false}>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-page-margin h-16 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6FN8ji9nIsI1AdtFVYUAgnqEY0m7Ndm3QwvkDFGnmdCBrI1MZy2j2ow54hHqsqyHsBr-5fR3wcmo47F8bKJUDVLszM_JQ0hLVD8bCKGNCabq-jSqXYgxM1igJdvk4tYuDkPL3fw_1hgT8Kk2hsjxPlcp6YUrru1LowBONk4IciSafI9M0J2QxyYdC5YBd5sCE6YqvbjMW9YSGfkiQ8Nwo3yoxO9_9ioA1Eqx-yNYH2Sl-OqQLvP_V4KmLM463WVZFv07jqW5Kl4U"
            />
          </div>
          <h1 className="font-manrope text-xl font-bold text-primary tracking-tight">FinanceFlow</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform hover:bg-surface-container-low">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
        </button>
      </header>

      <main className="pt-24 pb-32 px-page-margin flex flex-col gap-section-gap">
        {/* Profile Section */}
        <section className="space-y-element-gap">
          <h2 className="font-work-sans text-[10px] font-bold text-on-surface-variant px-1 uppercase tracking-[0.2em]">Profile</h2>
          <Card className="p-inner-padding" paperGrain>
            <div className="flex items-center gap-inner-padding">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
                  <img
                    alt="John Doe"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAknWYVz53bC4JIDnnjgo9DxaskuKCh4O3FbYanuPyxfl-lSqPH0Oksm7ey7W8JX1iD-rK4VJA6urFjCFP7P0_SZ4CFS0wRW85o3773oIHW7WCsh3r9jHwelQxkSuw21zoVkVbAc5pD03fKXritFU-EUSaIqk92z1cPNSf5n1GxQ2Lp9qVbUXnz3ul64veV8A3t5uYQ9rs9mUYDj6jOyvnbxjU1IvcWIEqv0Tx8abF2vs4YCHL-9n_B8qMmZeUXpeT3OK3SD2nXDLg"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary text-on-primary rounded-full flex items-center justify-center border-2 border-surface-container-lowest">
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                </div>
              </div>
              <div>
                <p className="font-manrope text-lg font-bold text-on-surface">John Doe</p>
                <p className="font-manrope text-sm text-on-surface-variant">john.doe@financeflow.com</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Preferences Section */}
        <section className="space-y-element-gap">
          <h2 className="font-work-sans text-[10px] font-bold text-on-surface-variant px-1 uppercase tracking-[0.2em]">Preferences</h2>
          <Card className="overflow-hidden" paperGrain>
            <SettingsRow icon="payments" label="Currency" value="USD ($)" />
            <div className="mx-inner-padding border-b border-dashed border-outline-variant" />
            <SettingsRow icon="language" label="Language" value="English (US)" />
          </Card>
        </section>

        {/* Security Section */}
        <section className="space-y-element-gap">
          <h2 className="font-work-sans text-[10px] font-bold text-on-surface-variant px-1 uppercase tracking-[0.2em]">Security</h2>
          <Card className="p-inner-padding" paperGrain>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">fingerprint</span>
                <div className="flex flex-col">
                  <span className="font-manrope font-semibold text-on-surface">Biometric lock</span>
                  <span className="font-work-sans text-xs text-on-surface-variant">Require FaceID or Fingerprint</span>
                </div>
              </div>
              <Toggle checked />
            </div>
          </Card>
        </section>

        {/* Appearance Section */}
        <section className="space-y-element-gap">
          <h2 className="font-work-sans text-[10px] font-bold text-on-surface-variant px-1 uppercase tracking-[0.2em]">Appearance</h2>
          <Card className="p-inner-padding" paperGrain>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">dark_mode</span>
                <span className="font-manrope font-semibold text-on-surface">Dark Mode</span>
              </div>
              <Toggle checked={theme === "dark"} onChange={toggleTheme} />
            </div>
          </Card>
        </section>

        {/* Danger Zone */}
        <button 
          onClick={handleLogout}
          className="w-full py-4 px-inner-padding rounded-xl border border-error/20 flex items-center justify-center gap-2 text-error font-manrope font-bold active:bg-error-container transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Sign Out</span>
        </button>
      </main>

      <BottomNav />
    </Layout>
  );
}

function SettingsRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between p-inner-padding active:bg-surface-container-low transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
        <span className="font-manrope font-semibold text-on-surface">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-work-sans text-xs font-bold text-primary">{value}</span>
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
      </div>
    </div>
  );
}

function Toggle({ checked = false, onChange }: { checked?: boolean, onChange?: () => void }) {
  return (
    <div className="relative inline-flex items-center cursor-pointer" onClick={onChange}>
      <input type="checkbox" className="sr-only peer" checked={checked} readOnly />
      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
    </div>
  );
}
