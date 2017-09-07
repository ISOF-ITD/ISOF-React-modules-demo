import React from 'react';
import { hashHistory } from 'react-router';

import _ from 'underscore';

import SimpleMap from './../../ISOF-React-modules/components/views/SimpleMap';
import PopupWindow from './../../ISOF-React-modules/components/controls/PopupWindow';
import LocalLibraryView from './../../ISOF-React-modules/components/views/LocalLibraryView';
import ImageOverlay from './../../ISOF-React-modules/components/views/ImageOverlay';
import FeedbackOverlay from './../../ISOF-React-modules/components/views/FeedbackOverlay';
import DropdownMenu from './../../ISOF-React-modules/components/controls/DropdownMenu';
import ElementNotificationMessage from './../../ISOF-React-modules/components/controls/ElementNotificationMessage';
import PopupNotificationMessage from './../../ISOF-React-modules/components/controls/PopupNotificationMessage';
import CheckBoxList from './../../ISOF-React-modules/components/controls/CheckBoxList';
import WindowScroll from './../../ISOF-React-modules/utils/windowScroll';
import Slider from './../../ISOF-React-modules/components/controls/Slider';
import AutocompleteInput from './../../ISOF-React-modules/components/controls/AutocompleteInput';

var Highlight = require('react-highlight');

import EventBus from 'eventbusjs';

export default class Application extends React.Component {
	constructor(props) {
		super(props);

		// Lägg till globalt eventBus variable för att skicka data mellan moduler
		window.eventBus = EventBus;

		this.popupNotificationSendMessageHandler = this.popupNotificationSendMessageHandler.bind(this);

		this.state = {
			popupVisible: false,
			messageInputValue: 'Popup meddelande',
			selectedCheckboxValues: []
		};

		this.checkBoxListValues = [
			{
				label: 'Val 1',
				value: 'option1'
			},
			{
				label: 'Val 2',
				value: 'option2'
			},
			{
				label: 'Val 3',
				value: 'option3'
			},
			{
				label: 'Val 4',
				value: 'option4'
			}
		];
	}

	popupNotificationSendMessageHandler() {
		eventBus.dispatch('popup-notification.notify', null, this.state.messageInputValue)
	}

	personsAutocompleteFormatListLabel(item) {
		return item.name+' ('+item.doc_count+')';
	}


	render() {
		const {
			popup
		} = this.props;

		var dropdownItems = [
			<a key="1" className="item" href="http://sprakochfolkminnen.se" target="_blank">Språk och folkminnen</a>,
			<a key="2" className="item" href="http://www.sprakochfolkminnen.se/om-oss/for-dig-i-skolan/arkivvaskan.html" target="_blank">Arkivväskan</a>,
			<a key="3" className="item" href="http://www.sprakochfolkminnen.se/sprak/sprakradgivning/frageladan.html" target="_blank">Frågelådan</a>,
			<a key="4" className="item" href="http://www.sprakochfolkminnen.se/om-oss/kartor/sagenkartan.html" target="_blank">Sägenkartan</a>
		];

		return (
			<div className={'app-container'+(this.state.popupVisible ? ' has-overlay' : '')}>
				<div className="container">
					<h1>ISOF React.js modul gallery</h1>

					<p>Exempel och kod för moduler som finns i <a href="https://github.com/ISOF-ITD/ISOF-React-modules">ISOF-React-modules</a>.</p>

					<hr/>

					<h2>SimpleMap</h2>

					<div className="row">
						<div className="six columns">
							<p>Enkel kartvy.</p>
						</div>

						<div className="six columns">

							<h3>CSS</h3>
							<Highlight>
								{
									[
										'@import "../ISOF-React-modules/less/leaflet.less";\n',
										'@import "../ISOF-React-modules/less/MarkerCluster.Default.less";\n',
										'@import "../ISOF-React-modules/less/ui-components/map.less";\n'
									]
								}
							</Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">

							<SimpleMap marker={{lat: 57.703784, lng: 11.965424, label: 'DAG, Göteborg'}} />

						</div>
						<div className="six columns">

							<Highlight>
								{
									[
										'<SimpleMap marker={{\n',
										'	lat: 57.703784, \n',
										'	lng: 11.965424, \n',
										'	label: \'DAG, Göteborg\'}} \n',
										'/>'
									]
								}
							</Highlight>

						</div>
					</div>

					<hr/>

					<h2>CheckBoxList</h2>

					<div className="row">
						<div className="six columns">
							<p>Lista som visar checkbox.</p>
						</div>

						<div className="six columns">

							<h3>CSS</h3>
							<Highlight>@import "../ISOF-React-modules/less/ui-components/checkbox-list.less";</Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">

							<CheckBoxList values={this.checkBoxListValues} onChange={function(event) {console.log(event); this.setState({selectedCheckboxValues: event})}.bind(this)} />
							{
								this.state.selectedCheckboxValues.length > 0 &&
								<p>
									<strong>Valda objekt</strong>: {this.state.selectedCheckboxValues.join(', ')}
								</p>
							}

						</div>
						<div className="six columns">

							<Highlight>
								{
									[
										'this.checkBoxListValues = [\n',
										'	{\n',
										'		label: \'Val 1\',\n',
										'		value: \'option1\'\n',
										'	},\n',
										'	{\n',
										'		label: \'Val 2\',\n',
										'		value: \'option2\'\n',
										'	},\n',
										'	{\n',
										'		label: \'Val 3\',\n',
										'		value: \'option3\'\n',
										'	},\n',
										'	{\n',
										'		label: \'Val 4\',\n',
										'		value: \'option4\'\n',
										'	}\n',
										']\n',
										'\n',
										'<CheckBoxList values={this.checkBoxListValues} />'
									]
								}
							</Highlight>

						</div>
					</div>

					<hr/>

					<h2>DropdownMenu</h2>

					<div className="row">
						<div className="six columns">
							<p>Modul som kan visa en lista eller annat innehåll i en popup-ruta. Öppnas vid att klicka på en knapp.</p>
						</div>

						<div className="six columns">

							<h3>CSS</h3>
							<Highlight>@import "../ISOF-React-modules/less/ui-components/dropdownmenu.less";</Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">

							<DropdownMenu
									manuallyClose="false"
									className="dropdown-css-class"
									label="Klicka för att öppna DropDown">
								{dropdownItems}
							</DropdownMenu>

						</div>
						<div className="six columns">

							<Highlight>
							 {
							 	[
							 		'import DropdownMenu from \'./../../ISOF-React-modules/components/controls/DropdownMenu\';\n',
							 		'\n',
									'var dropdownItems = [\n',
									'	<a key="1" className="item" href="http://sprakochfolkminnen.se" target="_blank">Språk och folkminnen</a>,\n',
									'	<a key="2" className="item" href="http://www.sprakochfolkminnen.se/om-oss/for-dig-i-skolan/arkivvaskan.html" target="_blank">Arkivväskan</a>\n',
									'	<a key="3" className="item" href="http://www.sprakochfolkminnen.se/sprak/sprakradgivning/frageladan.html" target="_blank">Frågelådan</a>\n',
									'	<a key="4" className="item" href="http://www.sprakochfolkminnen.se/om-oss/kartor/sagenkartan.html" target="_blank">Sägenkartan</a>\n',
									'];\n',
									'\n',
							 		'<DropdownMenu\n',
									'		manuallyClose="false"\n',
									'		className="dropdown-css-class"\n',
									'		label="Klicka för att öppna DropDown">\n',
									'	<div>\n',
									'		<p>DropdownMenu innehåll.</p>\n',
									'		<a href="http://www.sprakochfolkminnen.se/" target="_blank">Länk</a>\n',
									'	</div>\n',
									'</DropdownMenu>'
							 	]
							 }
							 </Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">

							<DropdownMenu
									manuallyClose="false"
									className="dropdown-css-class"
									headerText="Text för huvuded"
									label="Klicka för att öppna Dropdown"
									containerType="text">
								<p>Här kan även finnas text.<br/><br/><a href="http://sprakochfolkminnen.se" target="_blank">Språk och folkminnen</a></p>
							</DropdownMenu>

						</div>
						<div className="six columns">

							<Highlight>
							 {
							 	[
							 		'import DropdownMenu from \'./../../ISOF-React-modules/components/controls/DropdownMenu\';\n',
							 		'\n',
							 		'<DropdownMenu\n',
									'		manuallyClose="false"\n',
									'		className="dropdown-css-class"\n',
									'		headerText="Text för huvuded"\n',
									'		label="Klicka för att öppna Dropdown"\n',
									'		containerType="text">\n',
									'	<p>Här kan även finnas text.<br/><br/><a href="http://sprakochfolkminnen.se" target="_blank">Språk och folkminnen</a></p>\n',
									'</DropdownMenu>'
							 	]
							 }
							 </Highlight>

						</div>
					</div>

					<hr/>

					<h2>Slider</h2>

					<div className="row">
						<div className="six columns">
							<p>Slider modul.</p>
						</div>

						<div className="six columns">

							<h3>CSS</h3>
							<Highlight>
								{
									[
										'@import "../ISOF-React-modules/less/nouislider.min.less";\n',
										'@import "../ISOF-React-modules/less/ui-components/slider.less";'
									]
								}
							</Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">

							<Slider range={{min: 0, max: 100}}
								start={[20, 80]}
								enabled={true} />

						</div>
						<div className="six columns">

							<Highlight>
								{
									[
										'import Slider from \'./../../ISOF-React-modules/components/controls/Slider\';\n',
										'\n',
										'<Slider range={{min: 0, max: 100}}\n',
										'	start={[20, 80]}\n',
										'	enabled={true} />'
									]
								}
							</Highlight>

						</div>
					</div>

					<hr/>

					<h2>ElementNotificationMessage</h2>

					<div className="row">
						<div className="six columns">
							<p>Modul som visar meddelande för användaren som en liten popup-ruta. Rutan stängs efter 5 sekunder eller som definderat.</p>
							<p>Använder EventBus för att skicka meddelande till modulen.</p>
						</div>

						<div className="six columns">

							<h3>CSS</h3>
							<Highlight>
								{
									[
										'@import "../ISOF-React-modules/less/ui-components/popup-notification-message.less";'
									]
								}
							</Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">
							<PopupNotificationMessage duration={5000} />

							<button onClick={this.popupNotificationSendMessageHandler}>Skicka meddelande</button><br/>
							<input value={this.state.messageInputValue} type="text" onChange={function(event) {this.setState({messageInputValue: event.target.value})}.bind(this)} />
						</div>
						<div className="six columns">
							<Highlight>
								{
									[
										'import PopupNotificationMessage from \'./../../ISOF-React-modules/components/controls/PopupNotificationMessage\';\n',
										'\n',
										'<PopupNotificationMessage />\n',
										'<button onClick={this.sendMessage}>Skicka meddelande</button>\n',
										'\n',
										'sendMessage() {\n',
										'		eventBus.dispatch(\'popup-notification.notify\', null, \'Popup meddelande.\')\n',
										'}'
									]
								}
							</Highlight>
						</div>

					</div>

					<hr/>

					<h2>ElementNotificationMessage</h2>

					<div className="row">
						<div className="six columns">
							<p>Modul som visar meddelande kopplat till ett annat element på sidan.</p>
						</div>

						<div className="six columns">

							<h3>CSS</h3>
							<Highlight>
								{
									[
										'@import "../ISOF-React-modules/less/ui-components/element-notification-message.less";'
									]
								}
							</Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">

							<ElementNotificationMessage 
									placement="under" 
									placementOffsetX={-3} 
									placementOffsetY={16} 
									messageId="saveLegendsNotification" 
									forgetAfterClick={false} 
									closeTrigger="click" 
									autoHide={false} 
									message="ElementNotificationMessage exempel.">
								<button>Klicka här för att stänga popuprutan.</button>
							</ElementNotificationMessage>

						</div>
						<div className="six columns">

							<Highlight>
								{
									[
										'import ElementNotificationMessage from \'./../../ISOF-React-modules/components/controls/ElementNotificationMessage\'\n;',
										'\n',
										'<ElementNotificationMessage \n',
										'		placement="under" \n',
										'		placementOffsetX={-3} \n',
										'		placementOffsetY={16} \n',
										'		messageId="saveLegendsNotification" \n',
										'		forgetAfterClick={false} \n',
										'		closeTrigger="click" \n',
										'		autoHide={false} \n',
										'		message="ElementNotificationMessage exempel.">\n',
										'	<button>Klicka här!</button>\n',
										'</ElementNotificationMessage>'
									]
								}
							</Highlight>

						</div>
					</div>

					<hr/>

					<h2>AutocompleteInput</h2>

					<div className="row">
						<div className="six columns">
							<p>Text input som hämtar data från en API för att visa en "auto complete" lista. Exemplet visa lista över personer från Sägendatabas Elasticsearch som börjar på bokstaver som man har skrivit i textrutan.</p>
						</div>

						<div className="six columns">

							<h3>CSS</h3>
							<Highlight>
								{
									[
										'@import "../ISOF-React-modules/less/ui-components/autocomplete-input.less";'
									]
								}
							</Highlight>

						</div>
					</div>

					<div className="row">
						<div className="six columns">

							<AutocompleteInput inputName="termsInput" 
								searchUrl={'http://uuc-isof003-t.its.uu.se/sagenkarta/es/autocomplete/persons/?search=$s&relation=collector'} 
								valueField="name"
								listLabelFormatFunc={this.personsAutocompleteFormatListLabel} />


						</div>
						<div className="six columns">

							<Highlight>
								{
									[
										'import AutocompleteInput from \'./../../ISOF-React-modules/components/controls/AutocompleteInput\';\n',
										'\n',
										'personsAutocompleteFormatListLabel(item) {\n',
										'	return item.name+\' (\'+item.doc_count+\')\';\n',
										'}\n',
										'\n',
										'<AutocompleteInput inputName="termsInput" \n',
										'	searchUrl={\'http://uuc-isof003-t.its.uu.se/sagenkarta/es/autocomplete/persons/?search=$s&relation=collector\'} \n',
										'	valueField="term"\n',
										'	listLabelFormatFunc={this.personsAutocompleteFormatListLabel} />\n',
									]
								}
							</Highlight>

						</div>
					</div>

				</div>
			</div>
		);
	}
}