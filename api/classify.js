import axios from "axios";
import { getAgeGroup, getTopCountry } from "./utils.js";

export async function classifyName(name) {
  try {
    const [genderRes, ageRes, nationRes] = await Promise.all([
      axios.get(`https://api.genderize.io?name=${name}`),
      axios.get(`https://api.agify.io?name=${name}`),
      axios.get(`https://api.nationalize.io?name=${name}`),
    ]);

    const genderData = genderRes.data;
    const ageData = ageRes.data;
    const nationData = nationRes.data;

    // ❌ Edge cases
    if (!genderData.gender || genderData.count === 0) {
      throw new Error("Genderize");
    }

    if (ageData.age === null) {
      throw new Error("Agify");
    }

    const topCountry = getTopCountry(nationData.country);
    if (!topCountry) {
      throw new Error("Nationalize");
    }

    return {
      gender: genderData.gender,
      gender_probability: genderData.probability,
      sample_size: genderData.count,
      age: ageData.age,
      age_group: getAgeGroup(ageData.age),
      country_id: topCountry.country_id,
      country_probability: topCountry.probability,
    };
  } catch (err) {
    if (["Genderize", "Agify", "Nationalize"].includes(err.message)) {
      throw {
        status: 502,
        message: `${err.message} returned an invalid response`,
      };
    }

    throw { status: 500, message: "Server error" };
  }
}