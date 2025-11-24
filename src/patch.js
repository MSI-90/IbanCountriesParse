import { By } from 'selenium-webdriver';

const patch = {
    url: 'https://www.iban.com/country-codes',
    mainTable: By.xpath("//table[@id='myTable']"),
    tbody: By.xpath('//tbody//tr'),
    td_country: By.xpath("//table[@id='myTable']//tbody//tr//td[1]"),
    alpha2: By.xpath("//table[@id='myTable']//tbody//tr//td[2]"),
    alpha3: By.xpath("//table[@id='myTable']//tbody//tr//td[3]"),
    numeric: By.xpath("//table[@id='myTable']//tbody//tr//td[4]"),
};

export default patch;
