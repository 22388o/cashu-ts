import axios from "axios";
class CashuMint {
    mintUrl: String
    constructor(mintHost: String, mintApiRoot?: String, mintPort?: String,) {
        if (mintPort) {
            this.mintUrl = `${mintHost}:${mintPort}`
        }
        else {
            this.mintUrl = mintHost
        }
        if (mintApiRoot) {
            if (mintApiRoot.charAt(0) === '/') {
                mintApiRoot = mintApiRoot.substring(1, mintApiRoot.length - 1)
            }
            this.mintUrl = `${this.mintUrl}/${mintApiRoot}`
        }
    }

    async requestMint(amount: number){
        const { data } = await axios.get(`${this.mintUrl}/mint`, {
            params: {
                amount
            }
        })
        return data
    }
    async mint(payloads, paymentHash = '') {
        const { data } = await axios.post(`${this.mintUrl}/mint`, payloads,
            {
                params: {
                    payment_hash: paymentHash
                }
            })
        return data
    }

    async getKeys() {
        const { data } = await axios.get(`${this.mintUrl}/keys`)
        return data
    }

}

export { CashuMint }