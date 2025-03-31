import React from "react";



export default function About() {
	return (
		<div className="about" id="about">
			<div className="company">
				<p className="heading">Our Company’s Achievements</p>
				<p>
					Welcome to our real estate company! We are dedicated to providing
					the best properties and services to our clients. With years of
					experience in the industry, we have built a strong reputation for
					trust, quality, and customer satisfaction.
				</p>
				<br />
				<p>
					Our mission is to help individuals and families find their dream homes.
					We take pride in offering a wide range of modern apartments, excellent
					customer service, and a team of professionals ready to assist you at
					every step of your journey.
				</p>
			</div>
			<div className="stats">
				<div className="apartments">
					<p>
						<span>784</span> <br /> Apartments Available
					</p>
				</div>
				<div className="clients">
					<p>
						<span>3,854</span>
						<br /> Satisfied Clients
					</p>
				</div>
				<div className="employees">
					<p>
						<span>24</span>
						<br /> Dedicated Employees
					</p>
				</div>
				<div className="awards">
					<p>
						<span>14</span>
						<br /> Industry Awards
					</p>
				</div>
			</div>
		</div>
	);
}
