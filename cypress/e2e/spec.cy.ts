// ----------------------------------------------------
// TEST OF APPLICATION SEARCHING FOR MOVIES
// Searecing movies using omdbapi API
// Using Cypress for this test
// The test below is happy flow searching for Harry Potter
// Also testing that error message is displayed if 
// searching on 2 letter or blank
// ------------------------------------------------------

// ------------------------------------------------------
// 1. Happy flow on typing in mopvie and click on serach
// ------------------------------------------------------

describe('1. Search for movies', () => {

  // 1.a Type in part of movie name to serach for
  //     in this case Harry Porter
  it("1.a Should be able to type in movie name to search for", () => {
    cy.visit('http://localhost:1234')
    cy.get("input").type("Harry Potter") 
      .should("have.value", "Harry Potter")
    });


  // 1.b Should be able to click and search and check div, h3, img
  //     are cerated and that div gets the class movie
  //     I continue to test Harry Potter even though it is
  //     really the type I need fopr this test
  it("1.b Should be able to click and search and get result", () => {
    cy.visit('http://localhost:1234')

    cy.get("input").type("Harry Potter") 
    .should("have.value", "Harry Potter")
  
    //Act click buttom
    cy.get("button").click()
    
    //Check that div, h3 and img are created
    cy.get("div > div").should("exist")  
    cy.get("div > h3").should("exist")   
    cy.get("div > img").should("exist")   
    
    //check that got the class movie
    cy.get("div > div").should("have.class", "movie");
    });


  // 1.c Should display more than one in the list in this case 10 - extra check
  it("1.c Should display more than one in the list - in this test case 10", () => {
    cy.visit('http://localhost:1234')
  
    cy.get("input").type("Harry Potter") 
      .should("have.value", "Harry Potter")
    
    //Act click button
    cy.get("button").click()
    
    // same as above
    cy.get("div > div").should("exist")  
    cy.get("div > h3").should("exist")  
    cy.get("div > img").should("exist")  

    //Check that display more than one in this case 10
    cy.get("div > div")
      .should("have.length", 10)
        });
});

// --------------------------------------------------------------
// 2. Test that error message is displayed 
// --------------------------------------------------------------
describe('2. Should be able to dispay error message', () => {

  // 2.a Test if search for 2 letters 
  it("2.a Should be error messege when only search on 2 letters", () => {
    cy.visit('http://localhost:1234')

    // Type Ha 2 letter
    cy.get("input").type("Ha") 
        .should("have.value", "Ha")
    
    // Click button
    cy.get("button").click()

    // Check that the cerated p-tag contains the error message
    cy.get("p").should("contain", ("Inga sökresultat att visa"))
  });        
  
  // 2.b Test if serach on blank
  it("2.b Should be error messege when blank", () => {
    cy.visit('http://localhost:1234')
        
    // Blank meaning no type

    // Click button
    cy.get("button").click()
    
    // Check that the created p-tag contains the error message
    cy.get("p").should("contain", ("Inga sökresultat att visa"))
    });
    
});

