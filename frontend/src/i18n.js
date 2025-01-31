import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translation: {
                    welcome: "Welcome to Car Rental",
                    searchPlaceholder: "Search for a location...",
                    nearbyOffices: "Nearby Rental Offices",
                    noOffices: "No offices found nearby.",
                    changeLanguage: "Change Language",
                },
            },
            tr: {
                translation: {
                    welcome: "Araç Kiralamaya Hoşgeldiniz",
                    searchPlaceholder: "Bir konum arayın...",
                    nearbyOffices: "Yakındaki Kiralama Ofisleri",
                    noOffices: "Yakınlarda ofis bulunamadı.",
                    changeLanguage: "Dili Değiştir",
                },
            },
        },
        fallbackLng: "en",
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
        interpolation: { escapeValue: false },
    });

export default i18n;
