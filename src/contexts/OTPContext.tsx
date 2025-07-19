import React, { createContext, useContext, useState } from "react";

interface OtpContextType {
  phone: string;
  setPhone: (phone: string) => void;
  confirmationResult: any;
  setConfirmationResult: (result: any) => void;
  verified: boolean;
  setVerified: (v: boolean) => void;
}

const OtpContext = createContext<OtpContextType | undefined>(undefined);

export const useOtp = () => {
  const ctx = useContext(OtpContext);
  if (!ctx) throw new Error("useOtp must be used within OtpProvider");
  return ctx;
};

export const OtpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  return (
    <OtpContext.Provider value={{ phone, setPhone, confirmationResult, setConfirmationResult, verified, setVerified }}>
      {children}
    </OtpContext.Provider>
  );
};