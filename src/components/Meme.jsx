import React from "react";
import Select from "react-select";

export default function Meme() {
	const [meme, setMeme] = React.useState({
		topText: "",
		bottomText: "",
		randomImage: "http://i.imgflip.com/1bij.jpg",
	});
	const [allMemes, setAllMemes] = React.useState([]);
	const [selectedMeme, setSelectedMeme] = React.useState(null);

	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => res.json())
			.then((data) => setAllMemes(data.data.memes));
	}, []);

	const options = allMemes.map((meme) => ({
		value: meme,
		label: meme.name,
	}));

	function getMemeImage(event) {
		event.preventDefault();
		if (!selectedMeme) {
			alert("Please select a meme.");
			return;
		}
		const url = selectedMeme.value.url;
		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: url,
		}));
	}

	function getRandomImage(event) {
		event.preventDefault();
		const randomNumber = Math.floor(Math.random() * allMemes.length);
		const url = allMemes[randomNumber].url;
		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: url,
		}));
	}

	function handleChange(event) {
		const {name, value} = event.target;
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value,
		}));
	}

	function handleMemeChange(selectedOption) {
		setSelectedMeme(selectedOption);
	}

	return (
		<article>
			<div className="meme-search">
				<Select
					options={options}
					isClearable
					placeholder="Search for a meme..."
					value={selectedMeme}
					onChange={handleMemeChange}
				/>
				<button type="submit" onClick={getMemeImage}>
					<i class="fa fa-search"></i>
				</button>
			</div>

			<h3 style={{marginTop: "0px", marginBottom: "0px"}}>OR</h3>

			<button onClick={getRandomImage}>Get a new random meme image 🖼</button>

			<form className="meme-form">
				<section className="top dialogue">
					<label>Top Text:</label>
					<input
						placeholder="Eg. Shut up"
						name="topText"
						value={meme.topText}
						onChange={handleChange}
					/>
				</section>
				<section className="bottom dialogue">
					<label>Bottom Text:</label>
					<input
						placeholder="and take my money"
						name="bottomText"
						value={meme.bottomText}
						onChange={handleChange}
					/>
				</section>
			</form>
			<div className="meme">
				<img src={meme.randomImage} className="meme--image" />
				<h2 className="meme--text top-position">{meme.topText}</h2>
				<h2 className="meme--text bottom-position">{meme.bottomText}</h2>
			</div>
		</article>
	);
}
