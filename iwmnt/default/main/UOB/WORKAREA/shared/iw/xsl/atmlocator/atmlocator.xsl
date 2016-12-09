<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="atmlocator">
<div id="container">
<div id="main" role="main">
       <!-- <div class="container"> -->
            <div class="published-content uobmap" style="">
                <div id="masthead" class="masthead">
					<link rel="stylesheet" href="$URL_PREFIX/iwov-resources/css/uob-atm/desktopUOBmap.css" type="text/css" />
                    <link rel="stylesheet" href="$URL_PREFIX/iwov-resources/css/uob-atm/mobileUOBmap.css" type="text/css" />
                    <link rel="stylesheet" href="$URL_PREFIX/iwov-resources/css/uob-atm/printUOBmap.css" type="text/css" media="print"/>
					
                   <!-- <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,600,600italic,700italic,700,800,800italic" />-->

                    <!--[if lt IE 9]>
                    <div style="width:100%;text-align:center;background-color:#c00;color: #fff;padding: 6px; font-weight:bold;">
                        <p><b>Notification:</b> Please upgrade your browser for an enhanced browsing experience.<br>
                            Please <a href="https://uniservices1.uobgroup.com/secure/forms/url_redirection.jsp?CC=SG&URL=https://whatbrowser.org" target="_blank"><span style="font-style: normal; font-variant: normal; line-height: normal; color: #FFF; text-decoration: underline" target="_blank">click here</span></a> to update to a more recent one. </p>
                    </div>
                    <![endif]-->

                   <!-- <div id="container"> -->
                        <div class="contentTop">
                            <noscript><div class="text-no-js">Please enable javascript to view this page properly</div></noscript>
                            <div id="menu" class="menu">
                                <div class="branch">
                                    <span class="custom-select">Filter Branches &amp; Services</span>
                                    <span class="icon icon-arrow-down"></span>
                                    <!-- <span><img src="/uob-branches-and-atms/assets/img/menu/arrow.png"></span> -->
                                </div>
                                <div title="Back to Branch &amp; ATM Locator" class="back-branch">
                                    <span class="icon icon-arrow-left"></span>
                                    <span>Back to Branch &amp; ATM Locator</span>
                                </div>
                                <div class="float-right">
                                    <!--<div><a href="javascript:void(0)" class="geocodesearch"></a></div>-->
                                    <div class="geocodesearch-block" data-parent-search="" >
                                        <input type="text" id="geocodeInput" placeholder="Type location to search" aria-label="Type location to search" data-geolocation-input="" />
                                        <span title="Search" class="icon icon-search geocodesearch"></span>
                                        <!-- <div class="last-search"></div> -->
                                        <div class="recent-searches" data-recent-search="">
                                            <div class="recent-title">
                                                Recent Searches
                                            </div>
                                            <div class="recent-list">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="geocodefilter-block">
                                        <span class="icon geocodefilter no-select"></span>
                                    </div>
                                    <div class="geocodemenu-block">
                                        <span class="icon geocodemenu listview no-select"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-select">
                                <div class="selectBranchMenu">
                                    <div>
                                        <div class="title no-select">Branches &amp; Centres</div>
                                        <div class="branchMenuPOI"></div>
                                    </div>
                                    <div>
                                        <div class="title no-select">Self Service Machine</div>
                                        <div class="machineMenuPOI"></div>
                                    </div>
                                    <div>
                                        <div class="title no-select">Others Services</div>
                                        <div class="otherMenuPOI"></div>
                                    </div>
                                </div>
                                <div class="center-bottom-block">
                                    <div class="show-result">Show Results</div>
                                </div>
                            </div>
                            <noscript>
                                <iframe src="uob-locator-list-item-src.html" class="iframe-no-js"></iframe>
                            </noscript>
                            <div id="map-frame" class="map-frame">

                                <div id="map-canvas" class="map-canvas">
                                </div>
                                <div class="sidePane" data-container="sidePane">
                                    <!-- <a href="javascript:void(0)" id="toggle" class="toggle"></a> -->
                                    <div class="list-panel" data-custom-scroll =""></div>
                                    <div class="route-panel" data-custom-scroll=""></div>
                                </div>
                            </div>
                            <div class="sidePane_bottom" style="" data-container="sidePaneBottom">
                                <div class="top-expand">
                                    <span class="ico-expand no-select"></span>
                                </div>
                                <div class="sidePane_bottom_container">
                                </div>
                            </div>

                            <div class="sidePane_facility_details" style="" data-container="facilityDetail">
                                <div class="fac_header">
                                    <div class="navibar"><span class="icon icon-arrow-left"></span>BACK</div>
                                    <div class="title">
                                        <h3>Facility Details</h3></div>
                                </div>
                                <div class="fac_cont">
                                </div>
                            </div>
                            <div class="sidePane_direction_form" data-parent-search="">
                                <div class="top-nav">
                                    <span class="icon icon-arrow-left"></span>
                                    <span>BACK</span>
                                </div>

                                <div class="location-form">
                                    <div class="location-field">
                                        <span class="icon icon-location-black"></span>
                                        <span class="field-label">From</span>
                                        <input type="text" id="direction-from" placeholder="Choose starting point" data-geolocation-input="" data-direction-from="" />
                                    </div>
                                    <div class="location-field">
                                        <span class="icon icon-location-black"></span>
                                        <span class="field-label">To</span>
                                        <input type="text" id="direction-to" readonly="readonly" />
                                    </div>
                                    <div class="get-directions-btn" title="Get Directions">
                                        Get Directions
                                    </div>
                                </div>
                                <div class="recent-searches">
                                    <div class="recent-title">
                                        Recent Searches
                                    </div>
                                    <div class="recent-list">
                                    </div>
                                </div>
                            </div>
                        </div>
                   <!-- </div> -->
                    <!-- popup -->
                    <div class="hide m-popup">
                        <div class="title">UOB Branch &amp; ATM Locator</div>
                        <div class="content">
                            <p class="not-detect">Your browser does not have permission to access your location information. Please turn on your Location Services from your device settings. You may also search for Branch and Self-service machines by inputting a location in the search bar</p>
                            <p class="not-found">We could not locate the provided address. Please check whether the address is spelt correctly or try adding a postal code.</p>
                        </div>
                        <span class="m-close">OK</span>
                    </div>
                    <!-- overlay -->
                    <div class="hide overlay"></div>
                    <!-- template route-->
                    <div class="hide" data-template-route="">
                        <div class="route">
                            <div class="route-back-mobile"><span class="icon icon-arrow-left"></span>BACK</div>
                             <ul>
                                <li class="active"><i class="icon icon-driving" title="Driving"></i>
                                    <img class="hide" src="/iwov-resources/images/uob-atm/car-black.png"/>
                                </li>
                                <li><i class="icon icon-transit" title="Transit"></i>
                                    <img class="hide" src="/iwov-resources/images/uob-atm/bus-black.png"/>
                                </li>
                                <li><i class="icon icon-walk" title="Walking"></i>
                                    <img class="hide" src="/iwov-resources/images/uob-atm/walk-black.png"/>
                                </li>
                            </ul>
                        </div>
                        <div class="see-route-list">
                            <p class="summary"><span class="prefix-summary">Summary: </span> <span class="distantce"></span></p>
                            <a href="javascript:void(0)" class="button-srl">
                                <span class="text">See Route List</span><span class="icon icon-x"></span></a>
                        </div>
                        <div class="desc-block">
                            <span><i class="icon ellipse"></i></span>
                            <span class="text-start"></span>
                            <div class="ellipses">
                                <ul>
                                    <li><i class="icon m-ellipse"></i></li>
                                    <li><i class="icon m-ellipse"></i></li>
                                    <li><i class="icon m-ellipse"></i></li>
                                </ul>
                            </div>
                            <div>
                                <span><i class="icon icon-location"></i></span>
                                <span class="text-end"></span>
                            </div>
                        </div>
                        <div class="list-route-block">
                            <ul></ul>
                        </div>
                        <div class="show-route-detail"></div>
                    </div>
                    <!-- end template route-->
                    <!-- template detail block-->
                    <div class="hide" data-template-detail-block="">
                        <ul>
                            <li class="detail-block">
                                <div class="type"><i class="icon m-icon-"></i></div>
                                <div class="info">
                                    <p></p><span></span>
                                </div>
                                <div class="distance">
                                    <p></p><span></span></div>
                            </li>
                        </ul>
                    </div>
                    <!-- end template detail block-->
                    <!-- template route detail -->
                    <div class="hide" data-template-route-detail="">
                        <div class="block-route">
                            <span class="icon icon-back"></span>
                            <p class="text-from"></p>
                            <p class="text-to"></p>
                        </div>
                        <div class="block-route-detail">
                            <div class="route-sum">
                                <span class="route-duration"></span>
                                <span class="route-distance"></span>
                                <div class="info">
                                    <p class="route-summary"></p>
                                    <span class="route-duration-traffic"></span><span>minutes without traffic</span>
                                    <span class="icon icon-print" title="Print"></span>
                                </div>
                            </div>
                            <div class="route-step">
                                <div class="route-start">
                                    <p>Start</p>
                                    <div class="route-location">
                                        <i class="icon icon-location"></i>
                                        <span class="location-start"></span>
                                    </div>
                                </div>
                                <ul class="route-detail-step"></ul>
                                <div class="route-end">
                                    <p>End</p>
                                    <div class="route-location"><i class="icon icon-location"></i>
                                        <span class="location-end"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end template route detail -->

                    <!-- <script src="https://maps.googleapis.com/maps/api/js?v=3&client=gme-uobsingapore&sensor=false&libraries=geometry,places&language=en"></script> -->
                    <style>
                        #footer {
                            padding-top: 25px;
                        }

                        .fixed .overlay {
                            z-index: 53;
                        }

                        .icon.icon-lock {
                            background: none;
                        }
                        .wrapper {
                            background: #fff;
                        }
                        @media screen and (min-width: 768px){
                            .menu-select {
                                width: auto;
                            }
                        }
                        @media screen and (max-width: 767px) {
                            #footer {
                                display: none;
                                visibility: hidden;
                            }
                            #container {
                                min-height: 0;
                            }
                            .menu-fixed {
                                position: absolute;
                                top: 3px;
                            }

                            .route-panel {
                                top: 50px;
                            }

                            .sort-list ul {
                                margin: 0;
                            }

                            .block-personal .dropdown-menu, .block-languages .dropdown-menu {
                                position: relative;
                            }

                            .open-menu body .navbar-collapsed {
                                padding-bottom: 80px;
                            }

                            /*fixing menu open*/
                            .open-menu body .navbar-collapsed {
                                margin-bottom: 0;
                            }

                            /*.sidePane_bottom {*/
                            /*min-height: 150px;*/
                            /*}*/

                        }
						 @media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape){
                            #container {
                                min-height: 0;
                            }
                        }
                    </style>

                </div>
            </div>
        </div>
    </div>
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/libs/jquery.min.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/libs/bootstrap.min.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/libs/plugins.min.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/main.js"></script>
<script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/atmlocator-custom-1.js"></script>

<script type="text/javascript">_satellite.pageBottom();</script>
 <!--<script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/jquery-1.7.2.uobmap.js"></script>-->
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/jquery-ui-1.10.3.uobmap.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/jquery.slimscroll.uobmap.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/jScrollPane.uobmap.js"></script>
 <script src="https://maps.googleapis.com/maps/api/js?v=3&amp;key=AIzaSyB80TZrjwol0gSI9skQuznW3-aEs7_HRP4 &amp;libraries=geometry,places&amp;language=en"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/markerclusterer.uobmap.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/data_sg.uobmap.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/uobmap.uobmap.js"></script>

 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/main.uobmap.js"></script>
 
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/map.uobmap.js"></script>
 <!--<script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/atmlocatorexternal.js"></script>	-->
 <script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/uob-atm/atmlocator-custom-2.js"></script>
</xsl:template>
</xsl:stylesheet>