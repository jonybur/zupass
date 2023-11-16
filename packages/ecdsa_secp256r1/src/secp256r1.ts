import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import {
  PCD,
} from "@pcd/pcd-types";
import { v4 as uuid } from "uuid";
import c_secp256r1 from "../circuits/secp256r1/target/secp256r1.json";

//   const privKey = Buffer.from("ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", "hex")
//   const pubKey = secp256r1.publicKeyCreate(privKey)
//   const uncompressedPubKey = secp256r1.publicKeyConvert(pubKey, false)
//   const msg = Buffer.from(fromHex(messageToHash, "bytes"))
//   const signature = secp256r1.sign(msg, privKey)

let depsInitializedPromise: Promise<void> | undefined;
let backend;
let noir;

export const Secp256R1PCDTypeName = "secp256r1-pcd";

export type Secp256R1PCDProof = any;

export type Secp256R1PCDClaim = any;

export type Secp256R1PCDArgs = {
  pub_key_x: any;
  pub_key_y: any;
  signature: any;
  hashed_message: any;
};


async function init() {
  if (!depsInitializedPromise) {
    depsInitializedPromise = (async () => {
      backend = new BarretenbergBackend(c_secp256r1, { threads: 8 });
      noir = new Noir(c_secp256r1, this.backend);
    })();
  }

  await depsInitializedPromise;
}


export class Secp256R1PCD
  implements PCD<Secp256R1PCDClaim, Secp256R1PCDProof>
{
  type = Secp256R1PCDTypeName;

  public constructor(
    readonly id: string,
    readonly claim: Secp256R1PCDClaim,
    readonly proof: Secp256R1PCDProof
  ) {
    this.id = id;
    this.claim = claim;
    this.proof = proof;
  }
}

export async function prove(
  args: Secp256R1PCDArgs
): Promise<Secp256R1PCD> {
  
  const proof = await noir.generateFinalProof(args)

  // const claim = 

  return new Secp256R1PCD(uuid(), undefined, proof);
}


/**
 * Verify the claims and proof of a Secp256R1PCD.
 */
export async function verify(pcd: Secp256R1PCD): Promise<boolean> {
    return await noir.verifyFinalProof(pcd.proof);
}