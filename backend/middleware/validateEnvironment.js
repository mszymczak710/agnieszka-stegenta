const validateEnvironment = () => {
  const requiredEnv = ["EMAIL_HOST_USER", "EMAIL_HOST_PASSWORD"];
  const missingEnv = requiredEnv.filter((env) => !process.env[env]);

  if (missingEnv.length > 0) {
    throw new Error(
      `Brak wymaganych zmiennych środowiskowych: ${missingEnv.join(", ")}`,
    );
  }
};

module.exports = validateEnvironment;
