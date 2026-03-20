"use client";

import React, { createContext, useContext } from "react";

export type WebSettingData = {
  siteName?: string | null;
  shortName?: string | null;
  titleDashboard?: string | null;
  paymentBank?: string | null;
  paymentAccount?: string | null;
  paymentName?: string | null;
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
