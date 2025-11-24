import patch from "./src/patch.js";
import { WebElement, Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// настройки браузера
const options = new chrome.Options()
  .addArguments("--headless")
  .setPageLoadStrategy("normal");

// инициализация веб-драйвера
const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();

const getCountries = async (siteUrl) => {
  if (!siteUrl && typeof siteUrl !== "string") return;

  try {
    await driver.get(siteUrl);
    const countries = await driver.findElements(patch.td_country);
    const Alpha2codes = await driver.findElements(patch.alpha2);
    const Alpha3codes = await driver.findElements(patch.alpha3);
    const numerics = await driver.findElements(patch.numeric);

    const countryArray = [];
    // let index = 1;
    if (countries.length > 0) {
      for (let i = 0; i <= countries.length - 1; i++) {
        const countryinfo = {
          id: uuidv4(),
          country: await countries[i].getText(),
          Alpha2_code: await Alpha2codes[i].getText(),
          Alpha3_code: await Alpha3codes[i].getText(),
          Numeric: await numerics[i].getText(),
        };
        countryArray.push(countryinfo);
      }
    }
    return countryArray;
  } catch (error) {
    console.error("Не удалось выполнить действия браузера:", error);
  } finally {
    await driver.quit();
  }
};

const counties = await getCountries(patch.url);
await writeFile("countries1.json", JSON.stringify(counties, null, 2), "utf8");
