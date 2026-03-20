"use client";

import React, { createContext, useContext } from "react";

export type WebSettingData = {
  site_name?: string | null;
  short_name?: string | null;
  title_dashboard?: string | null;
  payment_bank?: string | null;
  payment_account?: string | null;
  payment_name?: string | null;
};

const SettingsContext = createContext<WebSettingData>({});

export const SettingsProvider = ({ settings, children }: { settings: WebSettingData, children: React.ReactNode }) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
