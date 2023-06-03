module.exports = {
  apps: [
    {
      name: "my-app",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
