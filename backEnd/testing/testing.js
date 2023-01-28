const mongoose = require("mongoose");
const gig = require("../models/gigModel");
const url = 'mongodb://localhost:27017/Freelance_Nepal';
beforeAll(async () => {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe("Testing gig schema", () => {
    //the code below is for insert testing
    it("Add gig testing", () => {
      const gigData = {
        title: "test gig",
        description: "testing the gig",
        rate: "2500",
        category: "miscellaneous",
        technique: "white box testing",
      };
      return gig.create(gigData).then((gig_ret) => {
        expect(gig_ret.title).toEqual("test gig");
      });
    });
    //testing if the update is working
    it("Updating the gig testing", async () => {
        const status = await gig.updateOne(
          { title: "test gig" },
          {
            title: "test update",
            description: "the test update succeded",
          }
        );
        expect(status.ok);
      });
      // delete testing;
      it("Deleting the gig testing", async () => {
        const status = await gig.findOneAndDelete({ title: "test update" });
        expect(status.ok);
      });
      //the below code is for update testing here
    });

