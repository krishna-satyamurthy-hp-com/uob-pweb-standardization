<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="promotiondetails">
		<xsl:variable name="expDate">
			<xsl:value-of select="Properties/Data/Datum[@ID='promotionCategories']/DCR/root/promo_details/Expiry_Date"/>
		</xsl:variable>
		<xsl:variable name="actDate">
			<xsl:value-of select="Properties/Data/Datum[@ID='promotionCategories']/DCR/root/promo_details/Activation_Date"/>
		</xsl:variable>
		<xsl:variable name="curDate">
			<xsl:value-of select="current-date()" />
		</xsl:variable>	
		<xsl:choose>
			<xsl:when test="format-date($curDate, '[M01]-[D01]-[Y0001]') &lt; $expDate and format-date($curDate, '[M]-[D]-[Y]') &gt; $actDate">
				<div class="container">
					<div class="row sticky-wrapper">
						<div class="offer-content">
							<h3><xsl:value-of select="Properties/Data/Datum[@ID='promotionCategories']/DCR/root/promo_details/promo_features/title_text"/></h3>
							<div class="bxslider-type-3">
								<ul class="list-unstyled">
									<xsl:for-each select="Properties/Data/Datum[@ID='promotionCategories']/DCR/root/promo_details/promo_features/image_banner">
										<li>
											<img>
												<xsl:attribute name="src">
													<xsl:value-of select="promo_image"/>
												</xsl:attribute>
												<xsl:attribute name="alt">
													<xsl:text>promotion detail</xsl:text>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>img-responsive</xsl:text>
												</xsl:attribute>
											</img>
										</li>
									</xsl:for-each>            
								</ul>
							</div>
							<div class="offer-button-group call-share-group hidden-sm hidden-md hidden-lg">
								<a href="tel:6563118195" title="Call"><span class="fa fa-phone"></span><span>Call</span></a>
								<a href="javascript:void(0);" title="Share" class="share-add-this">
									<img src="/iwov-resources/images/promotion-detail/icon-share.png" alt="Share"/>
									<span>Share</span>
									<div class="addthis_inline_share_toolbox"></div>
								</a>
							</div>
							<div class="offer-detail">
								<!-- Offer Blocks-->
								<xsl:for-each select="Properties/Data/Datum[@ID='promotionCategories']/DCR/root/promo_details/promo_features/offer_blocks/*">

									<xsl:choose>
										<xsl:when test="name() = 'description_free_text'">
											<!-- Freetext type-->
											<div class="offer-block"> 
												<xsl:value-of select="./desc" disable-output-escaping="yes" />
											</div> 
										</xsl:when>

										<xsl:when test="name() = 'cta_button'">
											<!-- CTA Button type-->
											<div class="offer-block">
												<div class="offer-button-group share-book-group">
													<a class="hidden-xs share-add-this">
														<xsl:attribute name="href">
															<xsl:value-of select="./Social_link" />
														</xsl:attribute>
														<xsl:attribute name="title">
															<xsl:value-of select="./Social_text" />
														</xsl:attribute>
														<img src="/iwov-resources/images/promotion-detail/icon-share.png" >
															<xsl:attribute name="alt">
																<xsl:value-of select="./Social_text"/>
															</xsl:attribute>
														</img>
														<span>
															<xsl:value-of select="./Social_text"/>
														</span>
														<div class="addthis_inline_share_toolbox"></div>
													</a>
													<a title="Book now" class="btn-1">
														<xsl:attribute name="href">
															<xsl:value-of select="./CTA_link" />
														</xsl:attribute>
														<xsl:value-of select="./CTA_text" />
													</a>
												</div>
											</div>
										</xsl:when>
										<xsl:when test="name() = 'how_it_works'">
											<!-- How it workd content-->
											<div class="offer-block">
												<div id="offerAccor2" class="panel-group margin-t-0 offer-accor">
													<div class="panel panel-default">
														<div class="panel-heading hidden-sm hidden-md hidden-lg">
															<h6 class="panel-title">
																<a>
																	<xsl:attribute name="data-toggle">
																		<xsl:text>collapse</xsl:text>
																	</xsl:attribute>
																	<xsl:attribute name="data-parent">
																		<xsl:text>offerAccor2</xsl:text>
																	</xsl:attribute>
																	<xsl:attribute name="href">
																		<xsl:text>#offerCollapse2</xsl:text>
																	</xsl:attribute>
																	<xsl:attribute name="title">
																		<xsl:value-of select="./title" />
																	</xsl:attribute>
																	<xsl:attribute name="class">
																		<xsl:text>accordion-toggle collapse</xsl:text>
																	</xsl:attribute>															
																	<xsl:value-of select="./title" />													
																</a>
															</h6>
														</div>
														<h3 class="hidden-xs">
															<xsl:value-of select="./title" />
														</h3>
														<div id="offerCollapse2" class="panel-collapse collapse in">
															<div class="panel-body">
																<div class="infomation-tbl">
																	<xsl:value-of select="./table" disable-output-escaping="yes"/>
																</div>
																<xsl:value-of select="./table_desc" disable-output-escaping="yes" />

																<div class="offer-block-item pusher-t-30">
																	<div class="item-thumbnail-2">
																		<img>
																			<xsl:attribute name="src">
																				<xsl:value-of select="./image_link" />
																			</xsl:attribute>
																			<xsl:attribute name="alt">
																				<xsl:value-of select="./title" />
																			</xsl:attribute>

																		</img>
																	</div>
																	<div class="item-content">
																		<xsl:value-of select="./image_desc" disable-output-escaping="yes" />
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</xsl:when>
										<xsl:when test="name() = 'free_text_with_image'">
											<!-- Freetext with Image type-->
											<div class="offer-block">
												<div id="offerAccor1" class="panel-group margin-t-0 offer-accor">
													<div class="panel panel-default">
														<div class="panel-heading hidden-sm hidden-md hidden-lg">
															<h6 class="panel-title">
																<a>
																	<xsl:attribute name="data-toggle">
																		<xsl:text>collapse</xsl:text>
																	</xsl:attribute>
																	<xsl:attribute name="data-parent">
																		<xsl:text>offerAccor1</xsl:text>
																	</xsl:attribute>
																	<xsl:attribute name="href">
																		<xsl:text>#offerCollapse1</xsl:text>
																	</xsl:attribute>
																	<xsl:attribute name="title">
																		<xsl:value-of select="./title" />
																	</xsl:attribute>                          
																	<xsl:value-of select="./title" />													
																</a>
															</h6>
														</div>
														<h3 class="hidden-xs"><xsl:value-of select="./title" /></h3>
														<div id="offerCollapse1" class="panel-collapse collapse in">
															<div class="panel-body">
																<div class="offer-block-item pusher-t-30">
																	<div class="item-thumbnail">
																		<img>
																			<xsl:attribute name="src">
																				<xsl:value-of select="./image_link" />
																			</xsl:attribute>
																			<xsl:attribute name="alt">
																				<xsl:value-of select="./title" />
																			</xsl:attribute>
																		</img>
																	</div>
																	<div class="item-content">
																		<xsl:value-of select="./desc" disable-output-escaping="yes" />																
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div> 
										</xsl:when>
										<xsl:when test="name() = 'free_text_with_title'">
											<!-- Freetext type-->
											<div class="offer-block"> 
												<h3><xsl:value-of select="./title" /></h3>
												<p><xsl:value-of select="./desc" disable-output-escaping="yes" /></p>

											</div> 
										</xsl:when>
										<!-- Contact Details-->
										<xsl:when test="name()='offer_contact'">
											<div class="offer-block-last">
												<div class="offer-contact-inline">											
													<xsl:for-each select="./contact_details">
														<div class="contact-item">
															<label><xsl:value-of select="./contact_heading"/></label>
															<!-- <a>
																<xsl:attribute name="href">
																	<xsl:value-of select="./contact_link"/>
																</xsl:attribute>
																<xsl:attribute name="title">
																	<xsl:value-of select="./contact_value" disable-output-escaping="yes"/>
																</xsl:attribute>                          
																<xsl:value-of select="./contact_value" disable-output-escaping="yes"/>
															</a> -->
															<xsl:value-of select="./contact_value" disable-output-escaping="yes"/>
														</div>
													</xsl:for-each>
												</div>
											</div>
										</xsl:when>
										<xsl:otherwise>

										</xsl:otherwise>
									</xsl:choose>             
								</xsl:for-each>
							</div>
						</div>
					</div>
				</div>
				<!-- -->
				<div class="container">
					<div class="row sticky-wrapper">
						<section class="other-info-block pusher-b-30 padding-0-30 no-background">
							<div id="accordion" class="panel-group margin-t-0">
								<div class="panel panel-default">
									<xsl:for-each select="Properties/Data/Datum[@ID='promotionCategories']/DCR/root/promo_details/promo_features/terms_conditions">
										<div class="panel-heading">       
											<h6 class="panel-title">
												<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" class="accordion-toggle collapsed">
													<xsl:attribute name="title">
														<xsl:value-of select="accordion_title"/>
													</xsl:attribute>
													<xsl:value-of select="accordion_title"/></a></h6>
										</div>
										<div id="collapseOne" class="panel-collapse collapse">
											<div class="panel-body">
												<xsl:value-of select="accordion_desc" disable-output-escaping="yes" />
											</div>
										</div>
									</xsl:for-each>
								</div>
							</div>
						</section>
					</div>
				</div>
			</xsl:when>
			<xsl:otherwise>
				<div class="container">
					<div class="row sticky-wrapper">

						<h3>This Promotion is not available at this moment. <a href="promotion-categories.page">Click here to go to All Promotions page.</a></h3>
						
								
								</div></div>
								<div>
									<xsl:value-of select="$actDate" />
								</div>
								<div>
									<xsl:value-of select="$expDate" />
								</div>
								<div>
									<xsl:value-of select="format-date($curDate, '[M]-[D01]-[Y]')" />
								</div>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:template>
			</xsl:stylesheet>