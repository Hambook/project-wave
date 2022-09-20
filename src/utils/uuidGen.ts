import { v4 } from "uuid";

function genUuid() {
	return `HBU-${v4()}`.toUpperCase();
}

export default genUuid;