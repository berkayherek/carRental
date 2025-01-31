import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => changeLanguage("en")} className="lang-btn">English</button>
            <button onClick={() => changeLanguage("tr")} className="lang-btn">Türkçe</button>
        </div>
    );
};

export default LanguageSwitcher;
