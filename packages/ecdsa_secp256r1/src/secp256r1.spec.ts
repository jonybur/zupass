import { expect } from "chai";
import "mocha";
import { Secp256R1PCDPackage } from "./secp256r1";

const hashed_message = [
  84, 112, 91, 163, 186, 175, 219, 223, 186, 140, 95, 154, 112, 247, 168, 155,
  238, 152, 217, 6, 181, 62, 49, 7, 77, 167, 186, 236, 220, 13, 169, 173
];
const pub_key_x = [
  85, 15, 71, 16, 3, 243, 223, 151, 195, 223, 80, 106, 199, 151, 246, 114, 31,
  177, 161, 251, 123, 143, 111, 131, 210, 36, 73, 138, 101, 200, 142, 36
];
const pub_key_y = [
  19, 96, 147, 215, 1, 46, 80, 154, 115, 113, 92, 189, 11, 0, 163, 204, 15, 244,
  181, 192, 27, 63, 250, 25, 106, 177, 251, 50, 112, 54, 184, 230
];
const signature = [
  44, 112, 168, 208, 132, 182, 43, 252, 92, 224, 54, 65, 202, 249, 247, 42, 212,
  218, 140, 129, 191, 230, 236, 148, 135, 187, 94, 27, 239, 98, 161, 50, 24,
  173, 158, 226, 158, 175, 53, 31, 220, 80, 241, 82, 12, 66, 94, 155, 144, 138,
  7, 39, 139, 67, 176, 236, 123, 135, 39, 120, 193, 78, 7, 132
];

describe("", () => {
  it("should be able to generate and verify a valid proof", async function () {
    const pcd1 = await Secp256R1PCDPackage.prove({
      hashed_message,
      pub_key_x,
      pub_key_y,
      signature
    });

    const claim = pcd1.claim;
    expect(claim.partialTicket.ticketId).to.be.equal(undefined);
    expect(claim.partialTicket.productId).to.not.be.equal(undefined);

    const verificationRes = await Secp256R1PCDPackage.verify(pcd1);
    expect(verificationRes).to.be.true;
  });
});
