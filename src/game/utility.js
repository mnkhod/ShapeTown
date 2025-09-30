import axios from "axios";
import { ethers } from "ethers";

export async function fetchMetamaskAccount() {
	if (!window.ethereum || !window.ethereum.selectedAddress) return "0x081901916FF0eBff4573533D1b34D54029B89B07"

	return window.ethereum.selectedAddress
}

export async function getReadAchievementNftContract() {
	let contractAddress = "0x23d6e7fe6dc435cdDC32e5aBBd3d6bE7f807bAbD"
	// let contractAddress = "0x6bc9Da82cB85D6D9e34EF7b8B2F930a8A83F5FB2"
	let contractAbi = [
		"function balanceOf(address,uint256) view returns (uint256)",
		"function mint(address,uint256,uint256,bytes)",
		"function uri(uint256) view returns (string)"
	]

	let provider = new ethers.JsonRpcProvider("https://rpc.open-campus-codex.gelato.digital")
	// let provider = new ethers.JsonRpcProvider("https://mainnet.shape.network")

	const nftContract = new ethers.Contract(contractAddress, contractAbi, provider);

	return nftContract
}

export async function checkAchievementNFT(id) {
	let metamaskAccount = await fetchMetamaskAccount()

	const nftContract = await getReadAchievementNftContract();

	try {
		let result = await nftContract.balanceOf(metamaskAccount, id)

		if (result > 0) return true;
	} catch (e) {
		return false;
	}

	return false;
}

export async function checkFirstHarvestAchievement() {
	return await checkAchievementNFT(0)
}

export async function checkGiftFromNatureAchievement() {
	return await checkAchievementNFT(1)
}

export async function checkFirstFishAchievement() {
	return await checkAchievementNFT(2)
}

export async function mintFirstHarvestAchievement({ onSuccess, onError }) {
	let metamaskAccount = await fetchMetamaskAccount()
	let baseURL = `${import.meta.env.VITE_REST_ENDPOINT}`;

	console.log("🎨 Minting First Harvest NFT...");
	console.log("📍 Endpoint:", `${baseURL}/shape/nft/create/0/${metamaskAccount}`);

	try {
		let result = await axios({
			method: 'get',
			url: `${baseURL}/shape/nft/create/0/${metamaskAccount}`,
			timeout: 30000 // 30 second timeout
		})

		console.log("📦 Mint response:", result.data);

		if (result.data.hash) {
			console.log("✅ NFT minted with hash:", result.data.hash);
			onSuccess()
		} else if (result.status === 200) {
			// Success even without hash
			console.log("✅ NFT mint successful (no hash returned)");
			onSuccess()
		} else {
			console.error("❌ Unexpected response:", result);
			onError(new Error("Unexpected response from mint API"))
		}
	} catch (e) {
		console.error("❌ Mint error:", e);
		console.error("Error details:", {
			message: e.message,
			response: e.response?.data,
			status: e.response?.status
		});
		onError(e)
	}
}

export async function mintGiftFromNatureAchievement({ onSuccess, onError }) {
	let metamaskAccount = await fetchMetamaskAccount()
	let baseURL = `${import.meta.env.VITE_REST_ENDPOINT}`;

	try {
		let result = await axios({
			method: 'get',
			url: `${baseURL}/shape/nft/create/1/${metamaskAccount}`
		})
		if (result.data.hash) {
			onSuccess()
		}
	} catch (e) {
		console.log(e);
		onError()
	}
}

export async function mintFirstFishAchievement({ onSuccess, onError }) {
	let metamaskAccount = await fetchMetamaskAccount()
	let baseURL = `${import.meta.env.VITE_REST_ENDPOINT}`;

	try {
		let result = await axios({
			method: 'get',
			url: `${baseURL}/shape/nft/create/2/${metamaskAccount}`
		})
		if (result.data.hash) {
			onSuccess()
		}
	} catch (e) {
		console.log(e);
		onError()
	}
}