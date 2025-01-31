import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Map from "../components/map";
import CarCard from "../components/CarCard";
import { getNearestOffices } from "../services/officeService";

const Home = () => {
    const { t } = useTranslation();
    const [offices, setOffices] = useState([]);
    const [searchLocation, setSearchLocation] = useState({ lat: 41.0082, lng: 28.9784 });

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const data = await getNearestOffices(searchLocation.lat, searchLocation.lng);
                console.log("🔍 Received offices:", data);
                setOffices(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching offices:", error);
                setOffices([]);
            }
        };

        fetchOffices();
    }, [searchLocation]);

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.content}>
                <h2>{t("welcome")}</h2> {/* ✅ Uses translation */}
                <input
                    type="text"
                    placeholder={t("searchPlaceholder")} // ✅ Uses translation
                    style={styles.input}
                    onBlur={(e) => {
                        const [lat, lng] = e.target.value.split(",").map(parseFloat);
                        setSearchLocation({ lat, lng });
                    }}
                />
                <Map offices={offices} />
                <h3>{t("nearbyOffices")}</h3> {/* ✅ Uses translation */}
                <div style={styles.officeList}>
                {Array.isArray(offices) && offices.length > 0 ? (
    offices.map((office) => <CarCard key={office.id} office={office} />)
) : (
    // ✅ Correct JSX comment format
    <p>{t("noOffices")}</p> 
)}

                </div>
            </div>
        </div>
    );
};

// ✅ Styles (keeps the same styling)
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    content: {
        width: "80%",
        maxWidth: "1000px",
        marginTop: "1rem",
    },
    input: {
        padding: "0.5rem",
        marginBottom: "1rem",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: "4px",
    },
    officeList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
    },
};

export default Home;
