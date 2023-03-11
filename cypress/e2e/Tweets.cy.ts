const baseUrl = "https://app.codescreen.com/api/";

describe("App loads successfully", () => {
  it("Visit the app", () => {
    cy.visit("/");
  });
});

describe("Tests for joe_smith", () => {
  it("Data renders correctly for joe_smith", () => {
    cy.visit("/");

    cy.intercept(`${baseUrl}/assessments/tweets*`, (req) => {
      req.reply({
        fixture: "tweets.json",
      });
    }).as("GetAssessments");

    cy.get('[id="input-box"]')
      .type("joe_smith")
      .should("have.value", "joe_smith");

    cy.get('[id="input-form"]').submit();

    cy.wait("@GetAssessments");

    cy.get('[id="most-popular-hashtag"]').should("have.text", "WorldCup2018");
    cy.get('[id="most-tweets"]').then((el) => {
      expect(el.text()).to.be.oneOf(["10", "11"]);
    });
    cy.get('[id="longest-tweet-id"]').should("have.text", "0c2dc9");
    cy.get('[id="most-days"]').then((el) => {
      expect(el.text()).to.be.oneOf(["120", "121"]);
    });
  });
});
