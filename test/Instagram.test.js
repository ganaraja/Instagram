const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let instagram;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  instagram = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "3000000" });
});

describe("Instagram", async () => {
  it("deploys a contract", () => {
    assert.ok(instagram.options.address);
  });

  it("allows to send image title and image url", async () => {
    await instagram.methods
      .send_image_details("Gana", "https://www.gana.com/gana1.jpg")
      .send({
        from: accounts[0],
        value: web3.utils.toWei("0.01", "ether")
      });
    assert.ok(instagram.posts.user);
  });
});
