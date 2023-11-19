import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { PCD, PCDPackage, SerializedPCD } from "@pcd/pcd-types";
import { requireDefinedParameter } from "@pcd/util";
import JSONBig from "json-bigint";
import { v4 as uuid } from "uuid";
import c_secp256r1 from "../circuits/secp256r1/target/secp256r1.json";
import { Secp256R1CardBody } from "./CardBody";

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
      backend = new BarretenbergBackend(c_secp256r1, 8);
      noir = new Noir(c_secp256r1, backend);
    })();
  }

  await depsInitializedPromise;
}

export class Secp256R1PCD implements PCD<Secp256R1PCDClaim, Secp256R1PCDProof> {
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

export async function prove(args: Secp256R1PCDArgs): Promise<Secp256R1PCD> {
  const proof = await noir.generateFinalProof(args);

  // once circuit gets adapted to ticket interface its going to have a claim
  return new Secp256R1PCD(uuid(), undefined, proof);
}

/**
 * Verify the claims and proof of a Secp256R1PCD.
 */
export async function verify(pcd: Secp256R1PCD): Promise<boolean> {
  return await noir.verifyFinalProof(pcd.proof);
}

/**
 * Serialize a Secp256R1PCD.
 */
export async function serialize(
  pcd: Secp256R1PCD
): Promise<SerializedPCD<Secp256R1PCD>> {
  return {
    type: Secp256R1PCDTypeName,
    pcd: JSONBig({ useNativeBigInt: true }).stringify(pcd)
  } as SerializedPCD<Secp256R1PCD>;
}

/**
 * Deserialize a Secp256R1PCD.
 */
export async function deserialize(serialized: string): Promise<Secp256R1PCD> {
  const { id, claim, proof } = JSONBig({ useNativeBigInt: true }).parse(
    serialized
  );

  requireDefinedParameter(id, "id");
  requireDefinedParameter(claim, "claim");
  requireDefinedParameter(proof, "proof");

  return new Secp256R1PCD(id, claim, proof);
}

export const Secp256R1PCDPackage: PCDPackage<
  Secp256R1PCDClaim,
  Secp256R1PCDProof,
  Secp256R1PCDArgs,
  undefined
> = {
  name: Secp256R1PCDTypeName,
  renderCardBody: Secp256R1CardBody,
  init,
  prove,
  verify,
  serialize,
  deserialize
};
