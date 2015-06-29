<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" 
xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<NamedLayer>
		<Name>scbporta</Name>
		<UserStyle>
			<Name>scbporta:_:bezport:_:default:bezport</Name>
			<Title>scbporta:_:bezport:_:default:bezport</Title>
			<Abstract>scbporta:_:bezport:_:default:bezport</Abstract>
			<FeatureTypeStyle>
				<Name>bezport</Name>
				<Rule>
					<Name>Portales</Name>
					<Title>default</Title>
					<Abstract>default</Abstract>
					<MinScaleDenominator>0.0</MinScaleDenominator>
					<MaxScaleDenominator>2500.0</MaxScaleDenominator>
					<TextSymbolizer>
						<Label>
							<ogc:PropertyName>numero_portal</ogc:PropertyName>
						</Label>
						<Font>
							<CssParameter name='font-family'>Arial</CssParameter>
							<CssParameter name='font-color'>#000000</CssParameter>
							<CssParameter name='font-weight'>bold</CssParameter>
							<CssParameter name='font-size'>16.0</CssParameter>
							<CssParameter name='font-style'>normal</CssParameter>
						</Font>
						<LabelPlacement>
							<PointPlacement>
								<AnchorPoint>
									<AnchorPointX>0.5</AnchorPointX>
									<AnchorPointY>0.5</AnchorPointY>
								</AnchorPoint>
								<Displacement>
									<DisplacementX>0.0</DisplacementX>
									<DisplacementY>0.0</DisplacementY>
								</Displacement>
								<Rotation>0.0</Rotation>
							</PointPlacement>
						</LabelPlacement>
					</TextSymbolizer>
				</Rule>
			</FeatureTypeStyle>
		</UserStyle>
		<UserStyle>
			<Name>scbporta:_:bezana_portales_base</Name>
			<Title>scbporta:_:bezana_portales_base</Title>
			<Abstract>scbporta:_:bezana_portales_base</Abstract>
			<FeatureTypeStyle>
				<Rule>
					<Name>Portales</Name>
					<Title>default</Title>
					<Abstract>default</Abstract>
					<MinScaleDenominator>0.0</MinScaleDenominator>
					<MaxScaleDenominator>2000.0</MaxScaleDenominator>
					<TextSymbolizer>
						<Label>
							<ogc:PropertyName>numero_portal</ogc:PropertyName>
						</Label>
						<Font>
							<CssParameter name='font-family'>Arial</CssParameter>
							<CssParameter name='font-color'>#000000</CssParameter>
							<CssParameter name='font-weight'>normal</CssParameter>
							<CssParameter name='font-size'>10.0</CssParameter>
							<CssParameter name='font-style'>normal</CssParameter>
						</Font>
						<LabelPlacement>
							<PointPlacement>
								<AnchorPoint>
									<AnchorPointX>0.5</AnchorPointX>
									<AnchorPointY>0.5</AnchorPointY>
								</AnchorPoint>
								<Displacement>
									<DisplacementX>0.0</DisplacementX>
									<DisplacementY>0.0</DisplacementY>
								</Displacement>
								<Rotation>0.0</Rotation>
							</PointPlacement>
						</LabelPlacement>
					</TextSymbolizer>
				</Rule>
			</FeatureTypeStyle>
		</UserStyle>
	</NamedLayer>
</StyledLayerDescriptor>

