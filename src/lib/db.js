import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "switchback.proxy.rlwy.net",
  database: "railway",
  password: "eWQWOEZqwWJBBZgELqWPOvMDUWluUycE",
  port: 15983,
});
