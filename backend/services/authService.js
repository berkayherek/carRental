export const register = async (user) => {
    try {
        console.log("Registering user:", user); // ✅ Log input data
        const response = await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
            email: user.email,
            password: user.password,
            name: user.name,
            country: user.country,
            city: user.city,
            phone: user.phone,
            created: new Date().toISOString(),
            pp: user.pp || "",
        });

        console.log("Registration success:", response); // ✅ Log success response
        return response;
    } catch (error) {
        console.error("Registration error:", error); // ✅ Log errors
        return { success: false, message: error.message };
    }
};
