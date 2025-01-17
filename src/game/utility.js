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

	try {
		let result = await axios({
			method: 'get',
			url: `${baseURL}/shape/nft/create/0/${metamaskAccount}`
		})
		if (result.data.hash) {
			onSuccess()
		}
	} catch (e) {
		console.log(e);
		onError()
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