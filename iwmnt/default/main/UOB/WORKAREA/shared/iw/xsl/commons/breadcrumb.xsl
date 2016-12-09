<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:variable name="homeLinkTarget" select="/Properties/Data/Datum[@ID='homeLinkTarget']/Option[@Selected='true']/Value"/>
  <xsl:variable name="componentId" select="/Properties/@ComponentID"/>
  
 <xsl:template name="horizontal-breadcrumb">
	<div class="container">
    <div class="row sticky-wrapper">
		 <ol data-tg-desktop="show" data-tg-tablet="show" class="breadcrumb">
			<xsl:apply-templates select="//Node"/>
		 </ol>
	</div>
	</div>
	<div id="main" class="container">
			<div class="row sticky-wrapper">
			
			<xsl:choose>
			<xsl:when test="/Properties/Data/Datum[@ID='pageName'] = ''">
			<xsl:for-each select="//Node">
			<xsl:if test="position()= last()">
				<h1 class="heading1"><xsl:value-of select="Label" />
				</h1>
				</xsl:if>
			</xsl:for-each>	
			</xsl:when>
			<xsl:otherwise>
				<h1 class="heading1"><xsl:value-of select="/Properties/Data/Datum[@ID='pageName']" />
				</h1>
			</xsl:otherwise>
			</xsl:choose>
				
			</div>
	</div>
 </xsl:template>

 <xsl:template match="Node">
    <xsl:choose>
      <xsl:when test="position() != last()">
	   <xsl:variable name="lable-value" select="Label"/>
	   <xsl:if test="($lable-value != 'personal')">
        <li>
          <xsl:choose>
            <xsl:when test="Link/@Type != ''">
              <xsl:variable name="linkValue"><xsl:choose>
                <xsl:when test="//External//Datum[@Name='UseUrlAliases'] = 'true' and Aliases/Alias"><xsl:value-of select="Aliases/Alias[1]"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="Link/Url"/></xsl:otherwise>
              </xsl:choose></xsl:variable>
              <a href="{$linkValue}">
                <xsl:if test="$homeLinkTarget != '' and $homeLinkTarget != 'none'">
                  <xsl:attribute name="target">
                    <xsl:value-of select="$homeLinkTarget"/>
                  </xsl:attribute>
                </xsl:if>
              <xsl:value-of select="Label"/></a>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="Label"/>
            </xsl:otherwise>
          </xsl:choose>
        </li>
		</xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <li class="active">
          <xsl:value-of select="Label"/>
        </li>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>