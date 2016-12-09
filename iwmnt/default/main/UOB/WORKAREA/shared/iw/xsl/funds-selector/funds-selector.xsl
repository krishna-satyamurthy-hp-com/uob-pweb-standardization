<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

	<xsl:template name="fundselector">
	    <xsl:if test="/Properties/Data/Group[@ID='G01']/Datum[@ID='G01-D01'] != ''">
        	<div class="container">
                <div class="row sticky-wrapper">
                    <div class="block-button-at-top">
        				<a target="_blank" class="btn-1">
        					<xsl:attribute name="href">
        						<xsl:value-of select="/Properties/Data/Group[@ID='G01']/Datum[@ID='G01-D02']"/>
        					</xsl:attribute>
        					<span class="fa fa-phone"></span>
        					<xsl:value-of select="/Properties/Data/Group[@ID='G01']/Datum[@ID='G01-D01']"/>
        				</a>
        			</div>
                </div>
            </div>
        </xsl:if>
        <div class="container">
            <div class="row sticky-wrapper">
                <div class="divider hidden-xs"></div>
                <div class="filter-block">
                    <div class="filter-control search-control">
                        <div class="form-control">
                            <input placeholder="Search by Fund Name" id="nova-searchbox" />
                        </div>
                        <button class="btn btn-searchclose"><span class="fa fa-times-thin"></span></button>
                        <button class="btn btn-searchfilter"><span class="fa fa-search"></span></button>
                    </div>
                    <div class="filter-control">
                        <label class="caption mobile-switch">Filter</label>
                    </div>
                    <div class="filter-control">
                        <select class="selectpicker" id="select-FundManager">
                            <option data-hidden="true" value="">Fund Manager</option>
                            <option value="">Please select</option>
                        </select>
                    </div>
                    <div class="filter-control">
                        <select class="selectpicker" id="select-AssetType">
                            <option data-hidden="true" value="">Asset Type</option>
                            <option value="">Please select</option>
                        </select>
                    </div>
                    <div class="filter-control">
                        <select class="selectpicker" id="select-GeographicRegion">
                            <option data-hidden="true" value="">Geographic Region</option>
                            <option value="">Please select</option>
                        </select>
                    </div>
                    <div class="filter-control">
                        <select class="selectpicker" id="select-CPFIS"> 
                            <option data-hidden="true" value="">CPFIS / SRS</option>
                            <option value="">Please select</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row sticky-wrapper">
                <div class="divider hidden-xs"></div>
                <div class="filter-block">
                    <div class="filter-control multiple">
                        <label class="caption">Product Risk Classification:</label>
                        <select multiple="multiple" title="Please Select" id="select-RiskClassification" class="selectpicker">
                            <!--<option value="1">Higher</option>
                            <option value="2">Medium to High</option>
                            <option value="3">Low to Medium</option>
                            <option value="4">Lower</option> -->
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row sticky-wrapper">
                <section class="content-block pusher-b-30">
                    <div class="expanded-table-control">
                        <button data-toggle="collapse-all" data-target="expanded-table" aria-expanded="false" class="btn-none accordion-toggle accordion-toggle-all collapsed">Expand all</button>
                    </div>
                    <table class="responsive-table expanded-table" id="nova-funds-list-table">
                        <thead>
                            <tr>
                                <th>Fund Name<span class="bs-caret"><span class="caret"></span></span></th>
                                <th>NAV</th>
                                <th>As at Date</th>
                                <th>Documents</th>
                                <th>Buy</th>
                                <th>&#160;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!--load table from ajax-->
                        </tbody> 
                    </table>
                    <div class="ajax-loading"> </div>
                    <div class="pagination">
                        <!--load pagination from ajax-->
                    </div>
                    <div class="no-results">
                    </div>
                </section>
            </div>
        </div>
    	<div class="fs-download-templates-container" style="display: none;">
            <div data-uob-tg-mobile="hide" class="dropdown-hover">
                <button type="button" data-toggle="dropdown" data-toggle-hover="true" aria-haspopup="true" aria-expanded="false" class="btn-none btn-focus"><span class="icon icon-file"></span></button>
                <div class="dropdown-menu">
                    <ul class="list-unstyled">
                        <li><a title="Fact Sheet" href="#" id="fact-sheet" target="_blank">Fact Sheet</a></li>
                        <li><a title="Product highlight"  href="#" id="product-highlight" target="_blank">Product highlight</a></li>
                        <li><a title="Prospectus" href="#" id="prospectus" target="_blank">Prospectus</a></li>
                        <li><a title="Annual Report" href="#" id="annual-report" target="_blank">Annual Report</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="fs-expand-content-template-container" style="display: none;">
            <div id="collapse1" class="expand-content collapse">
                <div class="text-block">
                    <div>
                        <h4>Fund Manager</h4>
                        <p id="fs-fund-manager"></p>
                        <p id="fs-fund-product-risk-classification"></p>
                    </div>
                    <div>
                        <h4>Investment Amount</h4>
                        <p id="fs-minimum"></p>
                        <p id="fs-subsequent"></p>
                    </div>
                    <div>
                        <h4>Launch Date</h4>
                        <p id="fs-launch-date"></p>
                    </div>
                    <div>
                        <h4>CPFIS</h4>
                        <p id="fs-cpfis"></p>
                    </div>
                </div>
                <div class="text-block">
                    <div>
                        <h4>Download</h4>
                        <ul class="list-unstyled">
                            <li><a title="Fact Sheet" id="fs-factsheet" href="#" target="_blank">Fact Sheet</a></li>
                            <li><a title="Product Highlights" id="fs-product-highlights" href="#" target="_blank">Product Highlights</a></li>
                            <li><a title="Prospectus" id="fs-prospectus" href="#" target="_blank">Prospectus</a></li>
                            <li><a title="Annual Report" id="fs-annual-report" href="#" target="_blank">Annual Report</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    	<div class="fs-toggle-collapse-expand-template-container" style="display: none;">
                <button data-toggle="collapse" data-target="#collapse1" aria-controls="collapse1" aria-expanded="false" class="btn-none accordion-toggle collapsed"></button>
        </div>
	</xsl:template>
</xsl:stylesheet>